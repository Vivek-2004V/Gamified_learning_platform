
export const metadata = {
  title: 'Anime Science Warriors',
  description: '3D Battle Simulation • Class 6 Learning Adventure',
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout intentionally omits the Header to provide a full-screen game experience.
  return <>{children}</>;
}
