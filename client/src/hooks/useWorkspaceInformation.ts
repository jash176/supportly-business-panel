import { useQuery, useQueryClient } from "@tanstack/react-query";
import { businessApi } from "@/lib/api/business";

export function useWorkspaceInformation() {
  return {
    ...useQuery({
      queryKey: [`workspaceInformation`],
      queryFn: businessApi.fetchWorkspaceDetails,
      initialData: () => {
        const stored = localStorage.getItem("workspaceInformation");
        return stored ? JSON.parse(stored) : undefined;
      },
    }),
  };
}
