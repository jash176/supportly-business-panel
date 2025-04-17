import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/context/auth";
import { useLocation } from "wouter";
import { toast } from "./use-toast";

export function useRegisterMutation() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      if (response.success) {
        login(response.data.token, response.data.business);
        setLocation("/create-workspace");
        return;
      }
      toast({
        title: "Error registering business",
        description: response.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
}
