import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface CreateAgentPayload {
  email: string;
  password: string;
  name: string;
}

interface CreateAgentResponse {
  success: boolean;
  status: number;
  data: {
    agent: {
      id: number;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    }
  }
}

export function useAddAgent() {
  return useMutation({
    mutationFn: async (payload: CreateAgentPayload) => {
      const response = await apiRequest(
        "POST",
        "/business-service/create-agent",
        payload
      );
      return response.json() as Promise<CreateAgentResponse>;
    },
  });
}
