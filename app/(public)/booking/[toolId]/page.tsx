export default function BookingPage({
  params,
}: {
  params: { toolId: string };
}) {
  return <div>Booking page for tool {params.toolId}</div>;
}
