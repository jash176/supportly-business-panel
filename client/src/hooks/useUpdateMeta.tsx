import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { sessionApi } from "@/lib/api/session";

export function useUpdateMeta() {
  return useMutation({
    mutationFn: sessionApi.updateMeta,
    onSuccess: (data) => {
      if (data.success) {
        
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error updating meta",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
}
