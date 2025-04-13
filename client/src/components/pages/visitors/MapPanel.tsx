import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorldMap from "@/components/ui/map";

interface MapPanelProps {
  visitors: SessionAttributes[];
  onVisitorSelect: (visitor: SessionAttributes) => void;
  onRefresh: () => void;
}

const MapPanel: React.FC<MapPanelProps> = ({
  visitors,
  onVisitorSelect,
  onRefresh,
}) => {
  const [timeframe, setTimeframe] = useState("24h");

  const handleRefresh = () => {
    // In a real app, this would refresh the visitor data
    onRefresh();
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Visitor Map</h2>
          <div className="flex">
            <Button
              variant="outline"
              className="flex items-center mr-2 text-sm"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-1" /> Refresh
            </Button>
            <Select defaultValue="24h" onValueChange={setTimeframe}>
              <SelectTrigger className="w-[130px] text-sm bg-gray-100 border-0">
                <SelectValue placeholder="Last 24 hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden">
          <WorldMap visitors={visitors} onMarkerClick={onVisitorSelect} />
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
