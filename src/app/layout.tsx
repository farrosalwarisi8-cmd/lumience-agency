import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navbar from "@/components/Navbar";

// Display font — bold, geometric, modern character for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Body font — clean, highly readable with a contemporary feel
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lumience — Where Ideas Take Shape, Digitally & Visually",
  description:
    "Lumience adalah agensi IT Solutions dan Multimedia Solutions yang menggabungkan kekuatan teknologi dan kreativitas visual. Coba Dulu, Percaya Kemudian.",
  keywords: [
    "Lumience",
    "IT Solutions",
    "Multimedia Solutions",
    "Web Development",
    "Mobile App",
    "3D Modeling",
    "Branding",
    "Bekasi",
  ],
  authors: [{ name: "Lumience" }],

  // ── LOGO UNTUK FAVICON TAB BROWSER & HASIL PENCARIAN GOOGLE ──
  icons: {
    icon: [
      { url: "/team/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  // ── PREVIEW LOGO SAAT LINK DI-SHARE KE WHATSAPP / MEDIA SOSIAL ──
  openGraph: {
    title: "Lumience — Where Ideas Take Shape, Digitally & Visually",
    description:
      "Agensi IT Solutions dan Multimedia Solutions. Coba Dulu, Percaya Kemudian.",
    siteName: "Lumience",
    images: [
      {
        url: "/team/logo.png",
        width: 1200,
        height: 630,
        alt: "Lumience Logo",
      },
    ],
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable}`}
    >
      <body className="font-body antialiased">
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}