export default function FollowUs() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: 'clamp(32px, 5vw, 56px)',
        fontWeight: 500,
        letterSpacing: '-0.03em',
        marginBottom: 24,
      }}>
        Follow Us
      </h1>
      <p style={{ opacity: 0.5, marginBottom: 40, maxWidth: 400, lineHeight: 1.6 }}>
        Stay updated with what we are building. Opanda Kanthu means &ldquo;blank&rdquo; in Malawi, because every creation starts from nothing.
      </p>

      <a
        href="https://www.linkedin.com/company/that-blank-engineering-research-company/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '14px 40px',
          border: '1px solid #F5F5F0',
          fontSize: 14,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          opacity: 1,
        }}
      >
        Follow on LinkedIn
      </a>
    </div>
  );
}
