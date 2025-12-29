import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ToasterProvider from "@/components/ToasterProvider/ToasterProvider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ToasterProvider />
      <main>{children}</main>
      <Footer />
    </>
  );
}
