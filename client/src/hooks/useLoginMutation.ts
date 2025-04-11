import { useMutation } from "@tanstack/react-query";
import { authApi, LoginCredentials } from "@/lib/api/auth";
import { useAuth } from "@/context/auth";
import { useLocation } from "wouter";
import { toast } from "./use-toast";

export function useLoginMutation() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if(response.success) {
        console.log("Response", response.success);
        login(response.data.token, response.data.user);
        setLocation("/inbox");
        return;
      }
      toast({
        variant: "destructive",
        title: "Login failed",
        description: response.message,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
      });
    },
  });
}
