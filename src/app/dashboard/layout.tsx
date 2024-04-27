import Sidebar from "@/src/containers/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <Sidebar />
      {children}
    </div>
  );
}
