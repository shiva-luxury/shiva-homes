export type YouTubeVideo = {
  videoId: string
  title: string
  thumbnail: string
  publishedAt: string
}

const CACHE_KEY = 'shiva_homes_youtube_cache'
const DAY_MS = 24 * 60 * 60 * 1000

export async function fetchLatestVideos(): Promise<YouTubeVideo[] | null> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  const handle = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_HANDLE || '@shivaluxury'
  if (!apiKey) return null

  const cached = localStorage.getItem(CACHE_KEY)
  if (cached) {
    const { videos, cachedAt } = JSON.parse(cached)
    if (Date.now() - cachedAt < DAY_MS) return videos
  }

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(handle.replace('@', ''))}&key=${apiKey}`
    )
    const channelData = await channelRes.json()
    const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
    if (!uploadsId) return null

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=6&key=${apiKey}`
    )
    const playlistData = await playlistRes.json()
    const videos: YouTubeVideo[] = (playlistData.items || []).map((item: any) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
      publishedAt: item.snippet.publishedAt,
    }))

    localStorage.setItem(CACHE_KEY, JSON.stringify({ videos, cachedAt: Date.now() }))
    return videos
  } catch {
    return null
  }
}
