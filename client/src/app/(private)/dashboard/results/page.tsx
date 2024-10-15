"use client";
import { useContractStore } from "@/store/zustand";

const ContractResultsPage = () => {
  const { analysisResults } = useContractStore();

  return <div>{JSON.stringify(analysisResults)}</div>;
};

export default ContractResultsPage;
