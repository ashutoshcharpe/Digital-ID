import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://council.aissmsioit.org"),
  title: "Ashutosh Charpe — Joint Media Secretary | Student Council Media Team",
  description: "Ashutosh Charpe — Joint Media Secretary | Student Council Media Team 2026-27, AISSMS Institute of Information Technology.",
  keywords: ["Student Council", "Media Team", "AISSMS IOIT", "Ashutosh Charpe", "Digital ID", "Photography", "Cinematography"],
  authors: [{ name: "AISSMS IOIT Student Council — Media Team" }],
  icons: {
    icon: [
      { url: "/assets/logo.png" },
      { url: "/icon.png" }
    ],
    apple: "/assets/logo.png"
  },
  openGraph: {
    title: "Ashutosh Charpe — Joint Media Secretary | Student Council Media Team",
    description: "Ashutosh Charpe — Joint Media Secretary | Student Council Media Team 2026-27, AISSMS Institute of Information Technology.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${manrope.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
