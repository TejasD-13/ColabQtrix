import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'ColabQtrix Technologies — Digital Solutions for Modern Businesses',
  description:
    'ColabQtrix Technologies delivers cutting-edge software solutions — web, mobile, AI, and cloud — empowering startups, SMEs, and enterprises to grow.',
  keywords: ['ColabQtrix', 'software development', 'web development', 'mobile apps', 'digital transformation', 'Pune'],
  openGraph: {
    title: 'ColabQtrix Technologies',
    description: 'Data, Design, Disruption, Delivered.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>{children}</body>
    </html>
  );
}
