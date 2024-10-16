import { ProtectedLayout } from "@/components/dashboard/protected-layout";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedLayout>
      <main>{children}</main>
    </ProtectedLayout>
  );
}
