import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap"
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://council.aissmsioit.org"),
  title: "Ashutosh Charpe — Joint Media Secretary | Student Council AISSMS IOIT",
  description: "Official Digital Extension of the Student Council ID Card, AISSMS Institute of Information Technology.",
  keywords: ["Student Council", "AISSMS IOIT", "Ashutosh Charpe", "Digital Council ID", "Vintage Editorial"],
  authors: [{ name: "Student Council AISSMS IOIT" }],
  icons: {
    icon: [
      { url: "/assets/council/student_council_logo.png" },
      { url: "/icon.png" }
    ],
    apple: "/assets/council/student_council_logo.png"
  },
  openGraph: {
    title: "Ashutosh Charpe — Joint Media Secretary | Student Council",
    description: "Official Digital Extension of the Student Council ID Card, AISSMS Institute of Information Technology.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${caveat.variable} antialiased selection:bg-[#641B18] selection:text-[#F6EBD5] bg-[#F5EFE6] text-[#1C1613] min-h-screen relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
