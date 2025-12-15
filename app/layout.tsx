import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

export const metadata = {
  title: "ToolNext",
  description: "Tool rental platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
