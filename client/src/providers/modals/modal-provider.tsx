import { ConnectAccountModal } from "@/components/modals/connect-accout-modal";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ConnectAccountModal />
    </>
  );
}
