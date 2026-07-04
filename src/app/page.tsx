import UploadForm from '@/components/UploadForm';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 500,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          marginBottom: 20,
        }}>
          Opanda Kanthu
        </h1>
        <p style={{
          fontSize: 16,
          opacity: 0.5,
          letterSpacing: '0.02em',
          maxWidth: 420,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Blank slate. Describe an idea, upload a sketch or a photo, and get an stl.
        </p>
      </div>

      <UploadForm />
    </div>
  );
}
