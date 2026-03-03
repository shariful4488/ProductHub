import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import ClientWrapper from "@/components/ClientWrapper";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ProductHub | Your Ultimate Product Directory",
  description: "Find and manage the best products in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ClientWrapper>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-24 pb-20 md:pb-32 px-4 max-w-7xl mx-auto w-full">
                 {children}
             </main>
            </div>
             {/* <Footer /> */}
              <Footer/>
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}