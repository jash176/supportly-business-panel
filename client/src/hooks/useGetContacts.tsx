import { useQuery } from "@tanstack/react-query";
import { sessionApi } from "@/lib/api/session";

export function useGetContacts() {
  return useQuery({
    queryFn: sessionApi.fetchCustomers,
    queryKey: ["getContacts"],
  });
}
