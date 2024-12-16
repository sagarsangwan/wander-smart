import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Wander Smart",
//   description: "Unleash your travel potential with our intelligent itinerary planner",
// };
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
        url: "https://wander-smart.vercel.app/heroimage.svg", // Path to your image
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
    images: ["https://wander-smart.vercel.app/heroimage.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
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
