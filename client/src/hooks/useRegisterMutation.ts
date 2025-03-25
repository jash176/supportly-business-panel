import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/context/auth";
import { useLocation } from "wouter";

export function useRegisterMutation() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      login(response.data.token, response.data.business);
      setLocation("/create-workspace");
    },
  });
}
