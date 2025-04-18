import { useState, useEffect } from "react";
import VisitorsPanel from "@/components/pages/visitors/VisitorsPanel";
import MapPanel from "@/components/pages/visitors/MapPanel";
import MobileAppDownload from "@/components/MobileAppDownload";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/context/auth";
import { useGetActiveVisitors } from "@/hooks/useGetActiveVisitors";

const Visitors: React.FC = () => {
  const socket = useSocket();
  const { user } = useAuth();
  const { data: visitors, isLoading, refetch } = useGetActiveVisitors();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();

    socket.emit("admin:join", user?.businessId);
    socket.on(`admin-${user?.businessId}`, (visitor: any) => {
      console.log(visitor);
    });
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (isMobile && location.pathname !== "/settings") {
    return <MobileAppDownload />;
  }

  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-hidden h-full">
      <VisitorsPanel
        visitors={visitors?.data || []}
        onVisitorSelect={() => {}}
      />
      <MapPanel
        visitors={visitors?.data || []}
        onVisitorSelect={() => {}}
        onRefresh={() => refetch()}
      />
    </div>
  );
};

export default Visitors;