import ProjectCard from '@/components/ProjectCard';

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
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
    </div>
  );
}
