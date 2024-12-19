import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";

export const metadata = {
  title: "Wander Smart",
  description: "Unleash your travel potential with our intelligent itinerary planner",
  openGraph: {
    title: "Wander Smart",
    description: "Unleash your travel potential with our intelligent itinerary planner",
    url: "https://wander-smart.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://wander-smart.vercel.app/heroImage.png", // Path to your image
        width: 1200,
        height: 630,
        alt: "Preview of wander smart",
      },
    ],
  },
  twitter: {
    card: "summary_large_image", // Use "summary" for a smaller card
    title: "Wander Smart",
    description: "Unleash your travel potential with our intelligent itinerary planner",
    images: ["https://wander-smart.vercel.app/heroImage.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2P2ZCQVMBJ"/>
    <Script id="google-analytics" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2P2ZCQVMBJ')`}
    </Script>
      <body suppressHydrationWarning>
        {process.env.NODE_ENV === 'production' && (
          <Script id="clarity_script_script" strategy="afterInteractive">
            {` 
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MICROSOFT_CLARITY}");

            
          `}
          </Script>)}
        <Providers>
          <Navbar />
          <main className=" container">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
