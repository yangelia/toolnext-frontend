export default function ToolDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>Tool details: {params.id}</div>;
}
