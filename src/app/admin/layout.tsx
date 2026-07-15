import { Sidebar } from "@/components/dashboard/sidebar";
import { ADMIN_NAV_ITEMS } from "@/constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar navItems={ADMIN_NAV_ITEMS} />
      <div className="md:pl-64">
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
