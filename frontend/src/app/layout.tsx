'use client';
import "./globals.css";
import { createEmotionCache } from "@/lib/emotion";
import { CacheProvider } from "@emotion/react";
import MainLayout from "@/components/MainLayout";
import { Providers } from "@/store/providers";
import AuthChecker from "@/components/AuthChecker"; // Import AuthChecker

const cache = createEmotionCache();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CacheProvider value={cache}>
            <AuthChecker />
            <MainLayout>{children}</MainLayout>
          </CacheProvider>
        </Providers>
      </body>
    </html>
  );
}