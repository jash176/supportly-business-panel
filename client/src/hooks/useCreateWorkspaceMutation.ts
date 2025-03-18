import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface CreateWorkspacePayload {
  businessName: string;
  domain: string;
}

interface WorkspaceResponse {
  success: boolean;
  status: number;
  message: string;
}

export function useCreateWorkspaceMutation() {
  return useMutation({
    mutationFn: async (payload: CreateWorkspacePayload) => {
      const response = await apiRequest(
        "POST",
        "/business-service/add-workspace",
        payload
      );
      return response.json() as Promise<WorkspaceResponse>;
    },
  });
}
