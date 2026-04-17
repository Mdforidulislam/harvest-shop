import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/store/provider";
import ThemeProvider from "@/components/shared/ThemeProvider";

export const metadata: Metadata = {
  title: "Harvest — Pure Organic Foods",
  description: "Shop 100% organic honey, ghee, mustard oil, dates, nuts and spices from Bangladesh's finest farms.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
