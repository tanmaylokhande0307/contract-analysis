"use client"

import { UploadModal } from "@/components/modals/upload-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Dashboard = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center">
      <Button onClick={() => setIsUploadModalOpen(true)}>Upload Contract</Button>
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
