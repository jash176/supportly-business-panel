import { apiRequest } from "../queryClient";

export interface WidgetSettings {
  success: boolean;
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  businessId: number;
  colorScheme: string;
  position: string;
  welcomeMessage: string;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt: Date;
}

export const widgetApi = {
  updateWidget: async (data: FormData): Promise<WidgetSettings> => {
    const response = await apiRequest("POST", "/widget-service/update", data);
    return response.json();
  },
};
