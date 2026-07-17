import type { Metadata } from "next";
import { Stack_Sans_Text, Poppins } from 'next/font/google'
import Header from "@/components/header/Header";
import AosProvider from "@/components/common/AosProvider";

import RevealImages from "@/components/common/RevealImages";
import Footer from "@/components/footer/Footer";
import { NonceProvider } from "@/lib/NonceProvider";
import { headers } from "next/headers";
import Providers from "@/lib/Providers";
import ScrollToTop from "@/components/common/ScrollToTop";
import '@/styles/globals.css'

const stackSansText = Stack_Sans_Text({
  subsets: ['latin'],
  display: 'swap',
  variable: '--stack',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--poppins',
});

export const metadata: Metadata = {
  title: "JNU",
  description: "Jaipur National University",
  icons: {
    icon: '/images/icons/favicon.ico',
    shortcut: '/images/icons/favicon.ico',
    apple: '/images/icons/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') ?? '';

  return (
    <html
      lang="en"
      className={`${stackSansText.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NonceProvider nonce={nonce}>
          <Providers>
            <AosProvider>
              <ScrollToTop />
              <Header />
              {children}
              <Footer />
              <RevealImages />
            </AosProvider>
          </Providers>
        </NonceProvider>
      </body>
    </html>
  );
}
