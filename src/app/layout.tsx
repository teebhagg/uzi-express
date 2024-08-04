import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/utils/providers/theme-providers";
import "./globals.css";
import StoreProvider from "@/utils/providers/store-provider";
import { Toaster } from "@/components/ui/toaster";
import {AuthProvider} from "@/utils/providers/auth-provider";
// import { getSession } from "@/auth"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UZI Express",
  description: "E-Commerce Store",
  keywords: ["E-Commerce", "Store", "Shop", "UZI Express"],
  authors: [{ name: "Joshua Ansah", url: "https://github.com/teebhagg" }],
  // colorScheme: 'dark',
  creator: "Joshua Ansah",
  publisher: "Joshua Ansah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <StoreProvider>
              {children}
              <Toaster />
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
