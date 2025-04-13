export const onlineUsers = new Map<string, string>();
export const liveVisitors = new Map<
  string,
  Map<
    string,
    {
      socketId: string;
      sessionId: string;
      userAgent: string;
      connectedAt: number;
    }
  >
>();
