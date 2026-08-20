export type YahooAuctionItem = {
  auctionId: string;
  title: string;
  url: string;
  imageUrl: string;
  priceJPY: number;
  priceCurrency: string;
  availability: string;
  condition: string;
  priceValidUntil: string;
};

export type YahooAuctionFeed = {
  sellerId: string;
  sellerUrl: string;
  listings: YahooAuctionItem[];
  fetchedAt: string;
  error?: string;
};

export type YouTubeVideoItem = {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
};

export type YouTubeChannelFeed = {
  channelId: string;
  channelTitle: string;
  channelUrl: string;
  avatarUrl: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
  videos: YouTubeVideoItem[];
  fetchedAt: string;
  error?: string;
};
