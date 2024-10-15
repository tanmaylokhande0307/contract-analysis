"use client";
import ContractAnalysisResults from "@/components/analysis/contract-analysis-results";
import { useContractStore } from "@/store/zustand";

const ContractResultsPage = () => {
  const analysisResults = useContractStore((state) => state.analysisResults);

  return (
    <ContractAnalysisResults contractId={"true"} analysisResults={analysisResults} isActive={true} onUpgrade={()=>{}}/>
  );
};

export default ContractResultsPage;
