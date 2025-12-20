import "./globals.css";
import { Inter } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.variable}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
