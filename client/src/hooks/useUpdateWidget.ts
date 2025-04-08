import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { widgetApi } from "@/lib/api/widget";
import { toast } from "./use-toast";

export function useUpdateWidget() {
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: widgetApi.updateWidget,
    onSuccess: () => {
    },
    onError: (error: any) => {
      toast({
        title: "Error adding agent",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
}
