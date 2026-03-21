import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Crypto Pointers — Your Premier Crypto Magazine'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1033 25%, #121a4a 50%, #0b1128 75%, #060612 100%)',
            display: 'flex',
          }}
        />

        {/* Decorative grid overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Top-left glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Center accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '40px',
          }}
        >
          {/* Logo icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '88px',
              height: '88px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
              marginBottom: '32px',
              boxShadow: '0 0 60px rgba(139, 92, 246, 0.4), 0 0 120px rgba(6, 182, 212, 0.2)',
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>

          {/* Blog name */}
          <div
            style={{
              display: 'flex',
              fontSize: '72px',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #06b6d4 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '16px',
            }}
          >
            Crypto Pointers
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              fontWeight: 500,
              color: '#a5b4fc',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            Your Premier Crypto Magazine
          </div>

          {/* Category pills */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Crypto News', 'Guides', 'Investing', 'Reviews'].map(
              (category) => (
                <div
                  key={category}
                  style={{
                    display: 'flex',
                    padding: '10px 24px',
                    borderRadius: '999px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    background: 'rgba(139, 92, 246, 0.1)',
                    color: '#c4b5fd',
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                  }}
                >
                  {category}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #8b5cf6 0%, #06b6d4 50%, #8b5cf6 100%)',
            display: 'flex',
          }}
        />

        {/* Domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '40px',
            display: 'flex',
            fontSize: '16px',
            fontWeight: 500,
            color: 'rgba(165, 180, 252, 0.4)',
            letterSpacing: '1px',
          }}
        >
          cryptopointers.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
