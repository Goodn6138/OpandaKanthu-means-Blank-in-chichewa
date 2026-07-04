import Link from 'next/link';

const projects = [
  {
    name: 'Opanda Kanthu',
    tagline: 'Image to 3D printable asset',
    description: 'Upload a sketch or photo. We generate a clean, watertight STL ready for your printer.',
    url: '/',
    status: 'Live',
  },
  {
    name: 'Pitchaprint',
    tagline: 'Final year projects from a description',
    description: 'Built for engineering students. Describe your idea and get a fully functional hardware project designed and built.',
    url: 'https://blankdesign-peach.vercel.app/',
    status: 'Live',
  },
  {
    name: 'STL to STEP',
    tagline: 'Mesh to CAD conversion',
    description: 'A rough demo that converts raw STL mesh files into editable STEP format for proper CAD workflows.',
    url: 'https://stl-cad.vercel.app/',
    status: 'Demo',
  },
];

export default function About() {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '120px 24px 80px',
      maxWidth: 800,
      margin: '0 auto',
    }}>
      <h1 style={{
        fontSize: 'clamp(32px, 5vw, 56px)',
        fontWeight: 500,
        letterSpacing: '-0.03em',
        marginBottom: 32,
        lineHeight: 1.1,
      }}>
        That Blank Engineering Research Company
      </h1>

      <p style={{
        fontSize: 17,
        lineHeight: 1.7,
        opacity: 0.6,
        marginBottom: 64,
      }}>
        An applied research company based in Kenya. We take leading research out of the lab and put it to work on real problems. No theoretical fluff. Just functional tools built from solid engineering.
      </p>

      <h2 style={{
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        opacity: 0.4,
        marginBottom: 32,
        borderBottom: '1px solid #2A2A2A',
        paddingBottom: 12,
      }}>
        What we are building
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {projects.map((p) => (
          <Link
            key={p.name}
            href={p.url}
            target={p.url.startsWith('http') ? '_blank' : undefined}
            rel={p.url.startsWith('http') ? 'noopener noreferrer' : undefined}
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
                {p.name}
              </h3>
              <span style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                opacity: 0.35,
                border: '1px solid #2A2A2A',
                padding: '4px 10px',
              }}>
                {p.status}
              </span>
            </div>
            <p style={{
              fontSize: 14,
              opacity: 0.7,
              marginBottom: 8,
              fontStyle: 'italic',
            }}>
              {p.tagline}
            </p>
            <p style={{
              fontSize: 15,
              opacity: 0.5,
              lineHeight: 1.6,
            }}>
              {p.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
