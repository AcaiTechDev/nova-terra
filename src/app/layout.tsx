import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://igrejanovaterra.com.br"),
  title: {
    default: "Igreja Nova Terra | Icoaraci, Belém-PA",
    template: "%s | Igreja Nova Terra",
  },
  description:
    "A Igreja Nova Terra existe para ganhar, cuidar e capacitar vidas para o Reino de Deus, em Icoaraci, Belém-PA. Conheça as Redes, o projeto Casa Amarela e venha nos visitar.",
  openGraph: {
    title: "Igreja Nova Terra",
    description:
      "Uma igreja em avivamento em Icoaraci, Belém-PA. Venha conhecer.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-night-900">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5CGBS4S5XB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5CGBS4S5XB');
          `}
        </Script>
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
