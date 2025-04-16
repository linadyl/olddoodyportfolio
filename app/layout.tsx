import type { Metadata } from "next";
import { Fragment_Mono} from "next/font/google";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "lina lee",
  description: "portfolio site for lina lee",
  icons: {
    icon: '/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${fragmentMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
