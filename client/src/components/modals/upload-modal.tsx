import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useContractStore } from "@/store/zustand";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface IUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export const UploadModal = ({
  isOpen,
  onClose,
  onUploadComplete,
}: IUploadModalProps) => {
  const { setAnalysisResults } = useContractStore();

  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [detectedType, setDetectedType] = useState<string | null>(null);
  const [step, setStep] = useState<
    "upload" | "detecting" | "confirm" | "processing" | "done"
  >("upload");

  const { mutate: detectContractType } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("contract", file);

      const response = await api.post<{ detectedType: string }>(
        `/contracts/detect-type`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.detectedType;
    },

    onSuccess: (data: string) => {
      setDetectedType(data);
      setStep("confirm");
    },
    onError: (error) => {
      console.error(error);
      setError("Failed to detect contract type");
      setStep("upload");
    },
  });

  const { mutate: uploadFile, isPending: isProcessing } = useMutation({
    mutationFn: async ({
      file,
      contractType,
    }: {
      file: File;
      contractType: string;
    }) => {
      const formData = new FormData();
      formData.append("contract", file);

      const response = await api.post(`/contracts/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      setAnalysisResults(data);
      setStep("done");
      onUploadComplete();
    },
    onError: (error) => {
      console.error(error);
      setError("Failed to upload contract");
      setStep("upload");
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
      setError(null);
      setStep("upload");
    } else {
      setError("No file selected");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleFileUpload = () => {
    if (files.length > 0) {
      setStep("detecting");
      detectContractType(files[0]);
    }
  };

  const handleAnalyzeContract = () => {
    if (files.length > 0 && detectedType) {
      setStep("processing");
      uploadFile({ file: files[0], contractType: detectedType });
    }
  };

  const handleClose = () => {
    onClose();
    setFiles([]);
    setDetectedType(null);
    setError(null);
    setStep("upload");
  };
};
