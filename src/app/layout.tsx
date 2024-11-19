import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import Providers from "@/app/(main)/provider";
import ReactQueryProvider from "@/app/ReactQueryProvider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { fileRouter } from "@/app/api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | K-Connect",
    default: "K-Connect",
  },
  description: "The ULTIMATE APP FOR GOSSIP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <Providers>{children}</Providers>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
