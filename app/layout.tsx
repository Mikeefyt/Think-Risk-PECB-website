import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Manrope } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header, TopBar } from '@/components/Header';
import { BasketFab, LearningPlanDrawer, Toast } from '@/components/LearningPlan';
import { Reveal } from '@/components/Reveal';
import { SiteProvider } from '@/components/SiteProvider';
import { SITE_URL } from '@/lib/courses';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-manrope', display: 'swap' });
const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-instrument-serif', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'PECB Training | Think Risk International',
  icons: { icon: '/assets/favicon.png', apple: '/assets/apple-touch-icon.png' },
};

export const viewport: Viewport = { themeColor: '#0b1b33' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${manrope.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SiteProvider>
          <a className="skip" href="#main">Skip to content</a>
          <TopBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <LearningPlanDrawer />
          <BasketFab />
          <Toast />
          <Reveal />
        </SiteProvider>
      </body>
    </html>
  );
}
