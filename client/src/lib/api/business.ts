import { apiRequest } from "../queryClient";

export interface WorkspaceInformation {
  success: boolean;
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  workspace: Workspace;
  agentCount: number;
}

export interface Workspace {
  id: number;
  name: string;
  email: string;
  businessName: string;
  domain: string;
  subscriptionPlan: string;
  maxSeats: number;
  createdAt: string;
  Widget: Widget[];
  Agents: Agent[];
}

export interface Widget {
  id: number;
  businessId: number;
  colorScheme: string;
  position: string;
  welcomeMessage: string;
  avatarUrl: any;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export const businessApi = {
  fetchWorkspaceDetails: async (): Promise<WorkspaceInformation> => {
    const response = await apiRequest(
      "GET",
      "/business-service/fetch-workspace-details"
    );
    return response.json();
  },
};
