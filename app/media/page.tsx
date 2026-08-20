import Image from "next/image";
import Link from "next/link";
import { ExternalLink, PlayCircle, Users, Video } from "lucide-react";
import { getYouTubeChannelFeed } from "@/lib/external-feeds";

export const revalidate = 1200;

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPublishedAt(value: string): string {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const fallbackImage =
  "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg";

export default async function MediaPage() {
  const feed = await getYouTubeChannelFeed(8);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-3xl border border-[var(--color-site-line)] bg-[linear-gradient(140deg,rgba(9,44,75,0.94)_0%,rgba(6,28,49,0.98)_100%)] p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.17em] text-cyan-200">
          YOUTUBE CHANNEL SHOWCASE
        </p>
        <h1 className="font-industrial mt-3 text-4xl text-white sm:text-5xl">
          Latest Videos From Our Export Channel
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--color-site-subtext)] sm:text-base">
          Live channel data is pulled from the YouTube Data API using your channel
          configuration in environment variables.
        </p>
      </div>

      {/* Don't expose raw API errors to public UI. If there are no videos, show
          a neutral fallback and skeletons so the page still looks deliberate. */}
      {feed.videos.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[var(--color-site-line)] bg-[var(--color-site-surface)] p-6 text-sm text-[var(--color-site-subtext)]">
          <p className="font-semibold">Channel preview unavailable</p>
          <p className="mt-1">We could not load recent videos right now. Please check back later.</p>
        </div>
      ) : null}

      <div className="mt-8 rounded-3xl border border-[var(--color-site-line)] bg-[#072945]/85 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full border border-cyan-300/35 bg-[#05223c]">
            <Image
              src={feed.avatarUrl || fallbackImage}
              alt={feed.channelTitle || "YouTube channel"}
              width={120}
              height={120}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-industrial text-3xl text-white">
              {feed.channelTitle || "Channel not resolved"}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-site-subtext)]">
              {feed.channelId ? `Channel ID: ${feed.channelId}` : "No channel ID loaded"}
            </p>
          </div>

          <Link
            href={feed.channelUrl || "https://www.youtube.com/@Jdmpqa2994"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-[#06253f] transition hover:bg-cyan-200"
          >
            Visit Channel
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
          <StatPill icon={Users} label="Subscribers" value={formatNumber(feed.subscriberCount)} />
          <StatPill icon={Video} label="Total Videos" value={formatNumber(feed.videoCount)} />
          <StatPill icon={PlayCircle} label="Total Views" value={formatNumber(feed.viewCount)} />
        </div>

        {feed.description ? (
          <p className="mt-5 max-w-4xl text-sm leading-7 text-[var(--color-site-subtext)]">
            {feed.description}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {feed.videos.length > 0
          ? feed.videos.map((video) => (
              <article
                key={video.videoId}
                className="overflow-hidden rounded-2xl border border-[var(--color-site-line)] bg-white shadow-sm"
              >
                <div className="relative">
                  <Image
                    src={video.thumbnailUrl || fallbackImage}
                    alt={video.title}
                    width={1280}
                    height={720}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="aspect-video w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                    {formatPublishedAt(video.publishedAt)}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-industrial line-clamp-2 text-lg text-slate-900">
                    {video.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--color-site-subtext)]">
                    {video.description || "No description available."}
                  </p>
                  <Link
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Watch Video
                  </Link>
                </div>
              </article>
            ))
          : // Render 4 skeleton placeholder cards when no videos available
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="animate-pulse overflow-hidden rounded-2xl border border-[var(--color-site-line)] bg-white/5 p-4"
              >
                <div className="mb-3 h-40 w-full rounded-md bg-slate-200/10" />
                <div className="h-4 w-3/4 rounded bg-slate-200/10" />
                <div className="mt-2 h-3 w-1/2 rounded bg-slate-200/10" />
              </div>
            ))}
      </div>

      {feed.videos.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[var(--color-site-line)] bg-[#072945]/80 p-8 text-center">
          <p className="font-industrial text-2xl text-white">No Videos Available</p>
          <p className="mt-2 text-sm text-[var(--color-site-subtext)]">
            Once the API key and channel are validated, this page will display the
            latest uploads automatically.
          </p>
        </div>
      ) : null}
    </section>
  );
}

type StatPillProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

function StatPill({ icon: Icon, label, value }: StatPillProps) {
  return (
    <div className="rounded-xl border border-cyan-300/20 bg-[#062743] px-4 py-3">
      <p className="inline-flex items-center gap-2 text-xs tracking-[0.12em] text-cyan-200">
        <Icon className="h-4 w-4" />
        {label}
      </p>
      <p className="font-industrial mt-1 text-2xl text-cyan-50">{value}</p>
    </div>
  );
}
