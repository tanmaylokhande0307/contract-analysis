"use client";
import ContractAnalysisResults from "@/components/analysis/contract-analysis-results";
import { useSubscription } from "@/hooks/use-subscription";
import { api } from "@/lib/api";
import stripePromise from "@/lib/stripe";
import { useContractStore } from "@/store/zustand";
import { toast } from "sonner";

const ContractResultsPage = () => {
  const analysisResults = useContractStore((state) => state.analysisResults);

  const {
    subscriptionStatus,
    isSubscriptionLoading,
    isSubscriptionError,
    setLoading,
  } = useSubscription();

  if (!subscriptionStatus) {
    return <div>Loading...</div>;
  }

  const isActive = subscriptionStatus.status === "active";

  const handleUpgrade = async () => {
    setLoading(true);
    if (!isActive) {
      try {
        const response = await api.get("/payments/create-checkout-session");
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      } catch (error) {
        toast.error("Please try again or login to your account");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("You are already a premium member");
    }
  };

  return (
    <ContractAnalysisResults
      contractId={"true"}
      analysisResults={analysisResults}
      isActive={isActive}
      onUpgrade={handleUpgrade}
    />
  );
};

export default ContractResultsPage;
