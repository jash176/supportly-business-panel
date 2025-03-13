import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, MapPin } from 'lucide-react';
import { Visitor } from '@/data/mockData';
import FlagIcon from '@/components/ui/flag-icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VisitorsPanelProps {
  visitors: Visitor[];
  activeVisitor: Visitor | null;
  onVisitorSelect: (visitor: Visitor) => void;
}

const VisitorsPanel: React.FC<VisitorsPanelProps> = ({ visitors, activeVisitor, onVisitorSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  
  // Filter visitors by search query and region
  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = searchQuery.trim() === '' || 
      visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.location.country.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesRegion = regionFilter === 'all' || visitor.location.region === regionFilter;
    
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Active Visitors</h2>
        <div className="mt-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Filter visitors"
              className="w-full pl-10 pr-4 py-2 bg-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">{filteredVisitors.length} visitors online</span>
          <Select 
            defaultValue="all" 
            onValueChange={setRegionFilter}
          >
            <SelectTrigger className="w-[130px] text-sm bg-gray-100 border-0">
              <SelectValue placeholder="All regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All regions</SelectItem>
              <SelectItem value="North America">North America</SelectItem>
              <SelectItem value="Europe">Europe</SelectItem>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="Oceania">Oceania</SelectItem>
              <SelectItem value="South America">South America</SelectItem>
              <SelectItem value="Africa">Africa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="overflow-y-auto h-full scrollbar-hide">
        {filteredVisitors.map((visitor) => (
          <div 
            key={visitor.id}
            className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
              activeVisitor?.id === visitor.id ? 'bg-gray-50' : ''
            }`}
            onClick={() => onVisitorSelect(visitor)}
          >
            <div className="flex items-center">
              <div className="relative mr-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={visitor.avatar} alt={visitor.name} />
                  <AvatarFallback>{visitor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-900">{visitor.name}</h3>
                  <div className="flex items-center">
                    <FlagIcon countryCode={visitor.location.countryCode} className="mr-1" />
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="text-gray-400 mr-1 h-4 w-4" />
                  <span>{visitor.location.city}, {visitor.location.country}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredVisitors.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No visitors found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorsPanel;
