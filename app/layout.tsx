import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import AuthProvider from "@/components/layout/AuthProvider";
import AnalyticsTracker from "@/components/layout/AnalyticsTracker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Kune-Ya — AI Agentic untuk ASN Aceh Tengah",
  description:
    "Platform AI Agentic untuk membantu ASN Diskominfo Aceh Tengah dalam administrasi, analisis kebijakan, penyusunan laporan, presentasi, dan tugas sehari-hari.",
  openGraph: {
    title: "Kune-Ya — AI Agentic untuk ASN Aceh Tengah",
    description:
      "Platform AI Agentic untuk ASN Diskominfo Aceh Tengah.",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased bg-gayo-50 text-gayo-950 dark:bg-gayo-950 dark:text-gayo-100`}
      >
        <AuthProvider>
          {children}
          <AnalyticsTracker />
        </AuthProvider>
      </body>
    </html>
  );
}
