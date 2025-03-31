import React, { createContext, useContext, useEffect, useState } from "react";

interface Widget {
  id: number;
  businessId: number;
  colorScheme: string;
  position: string;
  welcomeMessage: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Agent {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Workspace {
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

interface WorkspaceData {
  workspace: Workspace;
  agentCount: number;
}

interface WorkspaceContextType {
  workspaceData: WorkspaceData | null;
  setWorkspaceData: (data: WorkspaceData) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspaceData: null,
  setWorkspaceData: () => {},
});

export const useWorkspace = () => useContext(WorkspaceContext);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData | null>(
    () => {
      const stored = localStorage.getItem("workspaceData");
      return stored ? JSON.parse(stored) : null;
    }
  );

  useEffect(() => {
    if (workspaceData) {
      localStorage.setItem("workspaceData", JSON.stringify(workspaceData));
    }
  }, [workspaceData]);

  return (
    <WorkspaceContext.Provider value={{ workspaceData, setWorkspaceData }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
