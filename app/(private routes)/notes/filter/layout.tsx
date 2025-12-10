export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 140px)" }}>
      <aside style={{ width: "250px", flexShrink: 0 }}>{sidebar}</aside>
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}
