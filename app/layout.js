
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Script from "next/script";
import Head from "next/head";

export const metadata = {
  metadataBase:new URL("https://wander-smart.vercel.app/"),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      "google-site-verification": ['dPX5pFBWC0uIN7UcstmKdDk34jv1N_FEXjqLCNI1Dh8' ],
    },
  },
  title: "Wander Smart – Your Travel Companion.",
  description: "Unleash your travel potential with our intelligent itinerary planner",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
      <meta name="google-site-verification" content="dPX5pFBWC0uIN7UcstmKdDk34jv1N_FEXjqLCNI1Dh8" />
      </Head>
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
