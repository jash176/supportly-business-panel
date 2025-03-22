import { useEffect } from "react";
import { socketService } from "@/lib/socket";
import { useAuth } from "@/context/auth";

export const useSocket = () => {
  const {user} = useAuth()
  useEffect(() => {
    socketService.connect();
    socketService.emit("join-room", user?.businessId)
    return () => {
      socketService.disconnect();
    };
  }, []);

  return socketService;
};