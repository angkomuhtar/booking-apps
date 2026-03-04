import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const poppins = localFont({
  src: [
    {
      path: "./fonts/poppins/Poppins-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});

const geistMono = localFont({
  src: [
    {
      path: "./fonts/geist-mono/GeistMono-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/geist-mono/GeistMono-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/geist-mono/GeistMono-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/geist-mono/GeistMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/geist-mono/GeistMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/geist-mono/GeistMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/geist-mono/GeistMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/geist-mono/GeistMono-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/geist-mono/GeistMono-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ayo Booking - Book Your Sports Court",
  description: "Book badminton and padel courts easily online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
