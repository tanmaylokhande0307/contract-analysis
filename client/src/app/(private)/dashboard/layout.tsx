import { ProtectedLayout } from "@/components/dashboard/protected-layout";
import DashboardLayout from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedLayout>
      <DashboardLayout>
        <main className="flex-1 overflow-x-hidden bg-white overflow-y-auto p-6">
          {children}
        </main>
      </DashboardLayout>
    </ProtectedLayout>
  );
}
