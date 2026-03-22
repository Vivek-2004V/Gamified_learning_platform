'use client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
