export default function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "dark";
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
