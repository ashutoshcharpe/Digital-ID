import type { Metadata } from "next";
import { Montserrat, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://council.aissmsioit.org"),
  title: "Ashutosh Charpe — Joint Media Secretary | Student Council Media Team 2026",
  description: "Official Digital ID — AISSMS IOIT Student Council Media Team 2026. Photography, Cinematography, Media & Visual Communications.",
  keywords: ["Student Council", "Media Team", "AISSMS IOIT", "Ashutosh Charpe", "Digital Council ID", "Photography", "Cinematography"],
  authors: [{ name: "AISSMS IOIT Student Council — Media Team" }],
  icons: {
    icon: [
      { url: "/assets/council/student_council_logo.png" },
      { url: "/icon.png" }
    ],
    apple: "/assets/council/student_council_logo.png"
  },
  openGraph: {
    title: "Ashutosh Charpe — Joint Media Secretary | Student Council Media Team 2026",
    description: "Official Digital ID — AISSMS IOIT Student Council Media Team 2026.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${montserrat.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-[#00F0FF] selection:text-[#040810] bg-[#050B14] text-[#F0F9FF] min-h-screen relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
