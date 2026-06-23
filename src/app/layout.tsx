import type { Metadata } from "next";
import { Stack_Sans_Text } from 'next/font/google'
import Header from "@/components/header/Header";
import AosProvider from "@/components/common/AosProvider";

import '../styles/globals.css'
import RevealImages from "@/components/common/RevealImages";
// import '../styles/custom.css'

const stackSansText = Stack_Sans_Text({
  subsets:['latin'],
  display:'swap',
  variable:'--stack',
});

export const metadata: Metadata = {
  title: "JNU",
  description: "Jaipur National University",
  icons:{
    icon:'/images/icons/favicon.ico',
    shortcut: '/images/icons/favicon.ico',
    apple: '/images/icons/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${stackSansText.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AosProvider>
          <Header />
          {children}
          {/* <RevealImages /> */}
        </AosProvider>
      </body>
    </html>
  );
}
