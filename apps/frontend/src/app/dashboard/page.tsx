"use client";

import ClientList from "@/components/client/ClientList";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <DashboardNavbar user={user!} onLogout={logout} />
      <main className="p-2 lg:p-8">
        <h1 className="text-2xl font-bold pb-6">
          Bienvenue sur votre dashboard
        </h1>
        <section>
          <ClientList />
        </section>
      </main>
    </div>
  );
}
