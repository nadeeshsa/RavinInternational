import type { YahooAuctionFeed, YahooAuctionItem, YouTubeChannelFeed } from "@/types/external-feeds";

const sellerBaseUrl = "https://auctions.yahoo.co.jp/seller";
const yahooRevalidateSeconds = 60 * 30;
const youtubeRevalidateSeconds = 60 * 20;

const requestHeaders: HeadersInit = {
  "accept-language": "ja,en-US;q=0.9,en;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
};

type JsonObject = Record<string, unknown>;

function parseJsonLdBlocks(html: string): JsonObject[] {
  const blocks: JsonObject[] = [];
  const regex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  for (const match of html.matchAll(regex)) {
    const payload = match[1]?.trim();
    if (!payload) {
      continue;
    }

    try {
      const parsed = JSON.parse(payload) as unknown;
      if (Array.isArray(parsed)) {
        parsed.forEach((entry) => {
          if (entry && typeof entry === "object") {
            blocks.push(entry as JsonObject);
          }
        });
      } else if (parsed && typeof parsed === "object") {
        blocks.push(parsed as JsonObject);
      }
    } catch {
      continue;
    }
  }

  return blocks;
}

function safeText(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  return "";
}

function safeNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const digits = value.replace(/[^0-9.-]/g, "");
    const parsed = Number(digits);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return 0;
}

function extractAuctionId(url: string): string {
  const slashPart = url.split("/").pop() ?? "";
  return slashPart.split("?")[0] ?? url;
}

function parseAuctionUrlsFromSellerHtml(html: string): string[] {
  const jsonBlocks = parseJsonLdBlocks(html);
  const itemList = jsonBlocks.find((block) => block["@type"] === "ItemList");

  if (itemList && Array.isArray(itemList.itemListElement)) {
    const urls = itemList.itemListElement
      .map((entry) => {
        if (!entry || typeof entry !== "object") {
          return "";
        }
        return safeText((entry as JsonObject).url);
      })
      .filter((url) => url.includes("/jp/auction/"));

    if (urls.length > 0) {
      return Array.from(new Set(urls));
    }
  }

  const urlRegex = /https:\/\/auctions\.yahoo\.co\.jp\/jp\/auction\/[a-z0-9]+/gi;
  const fallbackMatches = html.match(urlRegex) ?? [];
  return Array.from(new Set(fallbackMatches));
}

async function fetchAuctionDetails(auctionUrl: string): Promise<YahooAuctionItem | null> {
  try {
    const response = await fetch(auctionUrl, {
      next: { revalidate: yahooRevalidateSeconds },
      headers: requestHeaders,
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const jsonBlocks = parseJsonLdBlocks(html);
    const product = jsonBlocks.find((block) => block["@type"] === "Product");

    if (!product) {
      return null;
    }

    const productName = safeText(product.name);
    const imageField = product.image;
    const firstImage =
      Array.isArray(imageField) && imageField.length > 0
        ? safeText(imageField[0])
        : safeText(imageField);

    const offers = (product.offers && typeof product.offers === "object"
      ? (product.offers as JsonObject)
      : {}) as JsonObject;

    return {
      auctionId: extractAuctionId(auctionUrl),
      title: productName,
      url: auctionUrl,
      imageUrl: firstImage,
      priceJPY: safeNumber(offers.price),
      priceCurrency: safeText(offers.priceCurrency) || "JPY",
      availability: safeText(offers.availability) || "https://schema.org/InStock",
      condition: safeText(offers.itemCondition) || "https://schema.org/UsedCondition",
      priceValidUntil: safeText(offers.priceValidUntil),
    };
  } catch {
    return null;
  }
}

function normalizeSchemaText(value: string): string {
  return value
    .replace("https://schema.org/", "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
}

function parseChannelEnv(channelValue: string): { queryType: "id" | "forHandle"; value: string } {
  const trimmed = channelValue.trim();
  if (trimmed.startsWith("UC")) {
    return { queryType: "id", value: trimmed };
  }

  return {
    queryType: "forHandle",
    value: trimmed.replace(/^@/, ""),
  };
}

export async function getYahooSellerFeed(limit = 8): Promise<YahooAuctionFeed> {
  const sellerId = process.env.NEXT_PUBLIC_YAHOO_SELLER_ID?.trim() ?? "";

  if (!sellerId) {
    return {
      sellerId: "",
      sellerUrl: "",
      listings: [],
      fetchedAt: new Date().toISOString(),
      error: "NEXT_PUBLIC_YAHOO_SELLER_ID is missing.",
    };
  }

  const sellerUrl = `${sellerBaseUrl}/${sellerId}`;

  try {
    const response = await fetch(sellerUrl, {
      next: { revalidate: yahooRevalidateSeconds },
      headers: requestHeaders,
    });

    if (!response.ok) {
      return {
        sellerId,
        sellerUrl,
        listings: [],
        fetchedAt: new Date().toISOString(),
        error: `Yahoo seller page request failed (${response.status}).`,
      };
    }

    const html = await response.text();
    const auctionUrls = parseAuctionUrlsFromSellerHtml(html).slice(0, limit);

    const listings = (
      await Promise.all(auctionUrls.map((auctionUrl) => fetchAuctionDetails(auctionUrl)))
    ).filter((item): item is YahooAuctionItem => item !== null);

    const normalizedListings = listings.map((item) => ({
      ...item,
      availability: normalizeSchemaText(item.availability),
      condition: normalizeSchemaText(item.condition),
    }));

    return {
      sellerId,
      sellerUrl,
      listings: normalizedListings,
      fetchedAt: new Date().toISOString(),
      error:
        normalizedListings.length === 0
          ? "No active listings were parsed from the seller feed."
          : undefined,
    };
  } catch {
    return {
      sellerId,
      sellerUrl,
      listings: [],
      fetchedAt: new Date().toISOString(),
      error: "Failed to fetch Yahoo seller feed.",
    };
  }
}

export async function getYouTubeChannelFeed(videoLimit = 8): Promise<YouTubeChannelFeed> {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim() ?? "";
  const channelEnv = process.env.YOUTUBE_CHANNEL_ID?.trim() ?? "";
  if (!channelEnv) {
    return {
      channelId: "",
      channelTitle: "",
      channelUrl: "",
      avatarUrl: "",
      description: "",
      subscriberCount: 0,
      videoCount: 0,
      viewCount: 0,
      videos: [],
      fetchedAt: new Date().toISOString(),
      error: "YOUTUBE_CHANNEL_ID is missing.",
    };
  }

  const channelQuery = parseChannelEnv(channelEnv);
  const channelLookupUrl = apiKey
    ? `https://www.googleapis.com/youtube/v3/channels` +
        `?part=snippet,statistics,contentDetails` +
        `&${channelQuery.queryType}=${encodeURIComponent(channelQuery.value)}` +
        `&key=${encodeURIComponent(apiKey)}`
    : null;

  try {
    type ChannelItem = {
      id: string;
      snippet: {
        title: string;
        description: string;
        thumbnails?: Record<string, { url: string }>;
      };
      contentDetails: {
        relatedPlaylists?: {
          uploads?: string;
        };
      };
      statistics?: {
        subscriberCount?: string;
        videoCount?: string;
        viewCount?: string;
      };
    };

    let channel: ChannelItem | null = null;

    if (channelLookupUrl) {
      const channelResponse = await fetch(channelLookupUrl, {
        next: { revalidate: youtubeRevalidateSeconds },
      });

      if (channelResponse.ok) {
        const channelPayload = (await channelResponse.json()) as {
      items?: Array<{
        id: string;
        snippet: {
          title: string;
          description: string;
          thumbnails?: {
            default?: { url: string };
            medium?: { url: string };
            high?: { url: string };
          };
          customUrl?: string;
        };
        contentDetails: {
          relatedPlaylists?: {
            uploads?: string;
          };
        };
        statistics?: {
          subscriberCount?: string;
          videoCount?: string;
          viewCount?: string;
        };
      }>;
        };

        channel = channelPayload.items?.[0] ?? null;
      }
    }

    // If the API is unavailable or didn't resolve a channel, try RSS/feeds.xml fallback
    if (!channel) {
      try {
        const handleOrId = channelQuery.value;
        const feedUrl = handleOrId.startsWith("UC")
          ? `https://www.youtube.com/feeds/videos.xml?channel_id=${handleOrId}`
          : `https://www.youtube.com/feeds/videos.xml?user=${handleOrId}`;

        const rssResp = await fetch(feedUrl, { next: { revalidate: youtubeRevalidateSeconds } });
        if (rssResp.ok) {
          const xml = await rssResp.text();
          const titleMatch = xml.match(/<title>([^<]+)<\/title>/i);
          const channelTitle = titleMatch?.[1] ?? "YouTube Channel";

          const items: Array<{ videoId: string; title: string; thumbnail: string; published: string }> = [];
          const itemRegex = /<entry>[\s\S]*?<yt:videoId>(.*?)<\/yt:videoId>[\s\S]*?<title>([\s\S]*?)<\/title>[\s\S]*?<published>(.*?)<\/published>[\s\S]*?<media:thumbnail url=\"(.*?)\"/gi;
          let m;
          while ((m = itemRegex.exec(xml)) !== null && items.length < videoLimit) {
            items.push({ videoId: m[1], title: m[2], published: m[3], thumbnail: m[4] });
          }

          return {
            channelId: channelEnv,
            channelTitle,
            channelUrl: `https://www.youtube.com/${channelEnv}`,
            avatarUrl: "",
            description: "",
            subscriberCount: 0,
            videoCount: items.length,
            viewCount: 0,
            videos: items.map((it) => ({
              videoId: it.videoId,
              title: it.title,
              description: "",
              publishedAt: it.published,
              thumbnailUrl: it.thumbnail,
              videoUrl: `https://www.youtube.com/watch?v=${it.videoId}`,
            })),
            fetchedAt: new Date().toISOString(),
          };
        }
      } catch {
        // continue to error return below
      }
    }

    if (!channel) {
      return {
        channelId: channelEnv,
        channelTitle: "",
        channelUrl: `https://www.youtube.com/${channelEnv}`,
        avatarUrl: "",
        description: "",
        subscriberCount: 0,
        videoCount: 0,
        viewCount: 0,
        videos: [],
        fetchedAt: new Date().toISOString(),
        error: apiKey ? "No channel matched YOUTUBE_CHANNEL_ID." : undefined,
      };
    }

    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) {
      return {
        channelId: channel.id,
        channelTitle: channel.snippet.title,
        channelUrl: `https://www.youtube.com/channel/${channel.id}`,
        avatarUrl:
          channel.snippet.thumbnails?.high?.url ||
          channel.snippet.thumbnails?.medium?.url ||
          channel.snippet.thumbnails?.default?.url ||
          "",
        description: channel.snippet.description,
        subscriberCount: safeNumber(channel.statistics?.subscriberCount),
        videoCount: safeNumber(channel.statistics?.videoCount),
        viewCount: safeNumber(channel.statistics?.viewCount),
        videos: [],
        fetchedAt: new Date().toISOString(),
        error: "Channel uploads playlist was not available.",
      };
    }

    const playlistUrl =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?part=snippet,contentDetails` +
      `&playlistId=${encodeURIComponent(uploadsPlaylistId)}` +
      `&maxResults=${videoLimit}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const videosResponse = await fetch(playlistUrl, {
      next: { revalidate: youtubeRevalidateSeconds },
    });

    if (!videosResponse.ok) {
      return {
        channelId: channel.id,
        channelTitle: channel.snippet.title,
        channelUrl: `https://www.youtube.com/channel/${channel.id}`,
        avatarUrl:
          channel.snippet.thumbnails?.high?.url ||
          channel.snippet.thumbnails?.medium?.url ||
          channel.snippet.thumbnails?.default?.url ||
          "",
        description: channel.snippet.description,
        subscriberCount: safeNumber(channel.statistics?.subscriberCount),
        videoCount: safeNumber(channel.statistics?.videoCount),
        viewCount: safeNumber(channel.statistics?.viewCount),
        videos: [],
        fetchedAt: new Date().toISOString(),
        error: `YouTube uploads request failed (${videosResponse.status}).`,
      };
    }

    const videosPayload = (await videosResponse.json()) as {
      items?: Array<{
        contentDetails?: {
          videoId?: string;
        };
        snippet?: {
          title?: string;
          description?: string;
          publishedAt?: string;
          thumbnails?: {
            maxres?: { url: string };
            standard?: { url: string };
            high?: { url: string };
            medium?: { url: string };
            default?: { url: string };
          };
        };
      }>;
    };

    const videos = (videosPayload.items ?? [])
      .map((entry) => {
        const videoId = entry.contentDetails?.videoId ?? "";
        if (!videoId) {
          return null;
        }

        const thumbnails = entry.snippet?.thumbnails;
        const thumbnailUrl =
          thumbnails?.maxres?.url ||
          thumbnails?.standard?.url ||
          thumbnails?.high?.url ||
          thumbnails?.medium?.url ||
          thumbnails?.default?.url ||
          "";

        return {
          videoId,
          title: entry.snippet?.title ?? "Untitled video",
          description: entry.snippet?.description ?? "",
          publishedAt: entry.snippet?.publishedAt ?? "",
          thumbnailUrl,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    return {
      channelId: channel.id,
      channelTitle: channel.snippet.title,
      channelUrl: `https://www.youtube.com/channel/${channel.id}`,
      avatarUrl:
        channel.snippet.thumbnails?.high?.url ||
        channel.snippet.thumbnails?.medium?.url ||
        channel.snippet.thumbnails?.default?.url ||
        "",
      description: channel.snippet.description,
      subscriberCount: safeNumber(channel.statistics?.subscriberCount),
      videoCount: safeNumber(channel.statistics?.videoCount),
      viewCount: safeNumber(channel.statistics?.viewCount),
      videos,
      fetchedAt: new Date().toISOString(),
      error: videos.length === 0 ? "No recent videos were returned by the YouTube API." : undefined,
    };
  } catch {
    return {
      channelId: channelEnv,
      channelTitle: "",
      channelUrl: `https://www.youtube.com/${channelEnv}`,
      avatarUrl: "",
      description: "",
      subscriberCount: 0,
      videoCount: 0,
      viewCount: 0,
      videos: [],
      fetchedAt: new Date().toISOString(),
      error: "Failed to fetch YouTube channel feed.",
    };
  }
}
