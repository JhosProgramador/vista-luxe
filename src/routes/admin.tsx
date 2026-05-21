import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — VC Estates" },
      { name: "description", content: "Internal management console for VC Estates." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-1 px-6 py-8 md:px-10">
        <Outlet />
      </main>
    </div>
  );
}
