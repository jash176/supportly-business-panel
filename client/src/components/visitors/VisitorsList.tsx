import { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { visitors } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface VisitorsListProps {
  onVisitorSelect: (visitorId: string) => void;
  selectedVisitorId: string | null;
}

const VisitorsList = ({ onVisitorSelect, selectedVisitorId }: VisitorsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter visitors based on search query
  const filteredVisitors = searchQuery.trim() === ''
    ? visitors
    : visitors.filter(visitor => 
        visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        visitor.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Active Visitors</h2>
        <div className="mt-2 relative">
          <input 
            type="text" 
            placeholder="Search visitors..." 
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-grow scrollbar-hide p-2">
        {filteredVisitors.map(visitor => (
          <div 
            key={visitor.id}
            className={cn(
              "p-3 hover:bg-gray-100 cursor-pointer rounded-lg mb-2",
              selectedVisitorId === visitor.id && "bg-gray-100"
            )}
            onClick={() => onVisitorSelect(visitor.id)}
          >
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                  <img 
                    src={visitor.avatar} 
                    alt={visitor.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                {visitor.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3 flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm">{visitor.name}</h3>
                  <div className="flex items-center">
                    <img 
                      src={`https://flagcdn.com/w20/${visitor.countryCode.toLowerCase()}.png`} 
                      alt={`${visitor.country} flag`} 
                      className="h-4 mr-1"
                    />
                    <span className="text-xs text-gray-500">{visitor.countryCode.toUpperCase()}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{visitor.city}</p>
                <div className="flex items-center mt-1">
                  <span className={cn(
                    "w-2 h-2 rounded-full mr-1",
                    visitor.status === 'online' ? "bg-success" : "bg-gray-400"
                  )}></span>
                  <span className="text-xs text-gray-500">{visitor.activityStatus}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredVisitors.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No visitors match your search.
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between">
          <div className="text-sm">
            <span className="font-medium">{visitors.length}</span> visitors online
          </div>
          <button className="text-sm text-primary flex items-center">
            <RefreshCw className="mr-1 h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorsList;
