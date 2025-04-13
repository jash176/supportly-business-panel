import { useQuery } from "@tanstack/react-query";
import { sessionApi } from "@/lib/api/session";

export function useGetActiveVisitors() {
  return useQuery({
    queryFn: sessionApi.fetchActiveVisitors,
    queryKey: ["visitors"],
  });
}
