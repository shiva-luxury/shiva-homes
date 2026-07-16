'use client'

import { useEffect, useState } from 'react'
import { SectionTitle, Card, Placeholder, Button } from './ui'
import { fetchLatestVideos, YouTubeVideo } from '../lib/youtube'
import { SOCIAL } from '../lib/constants'

export default function YouTubeSection() {
  const [videos, setVideos] = useState<YouTubeVideo[] | null>(null)

  useEffect(() => {
    fetchLatestVideos().then(setVideos)
  }, [])

  return (
    <section id="watch" className="section-pad bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle light eyebrow="Watch and Learn" title="Watch and Learn" subtitle="Market updates, neighborhood tours, and real estate tips every week." />

        {videos && videos.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {videos.map((v) => (
              <a key={v.videoId} href={`https://www.youtube.com/watch?v=${v.videoId}`} target="_blank" rel="noopener noreferrer">
                <Card className="overflow-hidden bg-white/5 border-white/10 hover:border-gold transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.thumbnail} alt={v.title} className="w-full aspect-video object-cover" />
                  <div className="p-4">
                    <p className="text-white text-sm line-clamp-2">{v.title}</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden bg-white/5 border-white/10">
                <Placeholder label="YouTube video" aspect="aspect-video" className="rounded-none bg-white/10 text-white/50" />
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer">
            <Button variant="gold" size="lg">Subscribe on YouTube</Button>
          </a>
        </div>
      </div>
    </section>
  )
}
