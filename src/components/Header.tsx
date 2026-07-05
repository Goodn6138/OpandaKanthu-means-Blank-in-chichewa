import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 40px',
      background: 'rgba(10,10,10,0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1A1A1A',
    }}>
      <Link href="/" style={{ opacity: 1, fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
        Opanda Kanthu
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 14 }}>
        <Link href="/about">About</Link>
        <Link href="/follow-us">Follow Us</Link>
      </nav>
    </header>
  );
}
