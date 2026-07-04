'use client';

import Link from 'next/link';

export default function ProjectCard({
  name,
  tagline,
  description,
  url,
  status,
}: {
  name: string;
  tagline: string;
  description: string;
  url: string;
  status: string;
}) {
  return (
    <Link
      href={url}
      target={url.startsWith('http') ? '_blank' : undefined}
      rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={{
        display: 'block',
        padding: '32px',
        border: '1px solid #2A2A2A',
        transition: 'border-color 0.3s, background 0.3s',
        opacity: 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#F5F5F0';
        e.currentTarget.style.background = 'rgba(245,245,240,0.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2A2A2A';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 12,
      }}>
        <h3 style={{
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: '-0.01em',
        }}>
          {name}
        </h3>
        <span style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          opacity: 0.35,
          border: '1px solid #2A2A2A',
          padding: '4px 10px',
        }}>
          {status}
        </span>
      </div>
      <p style={{
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 8,
        fontStyle: 'italic',
      }}>
        {tagline}
      </p>
      <p style={{
        fontSize: 15,
        opacity: 0.5,
        lineHeight: 1.6,
      }}>
        {description}
      </p>
    </Link>
  );
}
