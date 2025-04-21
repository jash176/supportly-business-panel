import { apiRequest } from "../queryClient";

export interface CustomersData {
  success: boolean;
  status: number;
  message: string;
  data: SessionAttributes[];
}

export interface SessionMetaData {
  sessionId: number;
  notes?: string;
  segments?: Array<string>;
}

export const sessionApi = {
  fetchCustomers: async (): Promise<CustomersData> => {
    const response = await apiRequest("GET", "/session-service/getContacts");
    return response.json();
  },
  fetchActiveVisitors: async (): Promise<CustomersData> => {
    const response = await apiRequest("GET", "/session-service/active-users");
    return response.json();
  },
  updateMeta: async (data: SessionMetaData) => {
    const response = await apiRequest("POST", "/session-service/meta", data);
    return response.json();
  }
};
