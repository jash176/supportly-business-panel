import { apiRequest } from "../queryClient";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
    user: {
      id: number;
      businessId: number;
      name: string;
      email: string;
      password: string;
      role: string;
      avatar: any;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface RegisterResponse {
  data: {
    token: string;
    business: {
      id: number;
      businessId: number;
      name: string;
      email: string;
      password: string;
      role: string;
      avatar: any;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiRequest(
      "POST",
      "/business-service/login",
      credentials
    );
    return response.json();
  },
  register: async (credentials: RegisterBody): Promise<RegisterResponse> => {
    const response = await apiRequest(
      "POST",
      "/business-service/register",
      credentials
    );
    return response.json();
  },
};
