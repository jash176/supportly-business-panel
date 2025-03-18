import { useMutation } from "@tanstack/react-query";
import { authApi, LoginCredentials } from "@/lib/api/auth";
import { useAuth } from "@/context/auth";
import { useLocation } from "wouter";

export function useLoginMutation() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      console.log("Response", response);
      login(response.data.token, response.data.user);
      setLocation("/");
    },
  });
}
