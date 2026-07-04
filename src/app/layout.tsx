import type { Metadata } from 'next';
import Header from '@/components/Header';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

export const metadata: Metadata = {
  title: 'Opanda Kanthu',
  description: 'image to stl.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <Header />
        <main style={{ paddingTop: 80 }}>{children}</main>
      </body>
    </html>
  );
}
