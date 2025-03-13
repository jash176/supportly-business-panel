import { useState } from 'react';
import { Search, Filter, Plus, Edit, MoreVertical, ChevronDown } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { contacts } from '@/lib/mockData';

const ContactsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('All Segments');
  
  const segments = ['All Segments', 'Customers', 'Prospects', 'Partners'];
  
  // Filter contacts based on search query and segment
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSegment = 
      selectedSegment === 'All Segments' || 
      contact.segment === selectedSegment.slice(0, -1); // Remove the 's' from the end
      
    return matchesSearch && matchesSegment;
  });
  
  // Function to render star rating
  const renderStarRating = (score: number) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">★</span>
        ))}
      </div>
    );
  };
  
  // Get badge variant based on segment
  const getSegmentBadgeVariant = (segment: string) => {
    switch(segment) {
      case 'Customer': return 'blue';
      case 'Partner': return 'green';
      case 'Prospect': return 'purple';
      default: return 'blue';
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Contacts</h1>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Contact</span>
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="relative flex-grow max-w-md">
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          <select 
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
          >
            {segments.map(segment => (
              <option key={segment} value={segment}>{segment}</option>
            ))}
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-6">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 border-b border-gray-200">
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Full Name</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Email</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Location</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Segment</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Last Active</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  <div className="flex items-center">
                    <span>Score</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-center whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map(contact => (
                <TableRow key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                        <img 
                          src={contact.avatar} 
                          alt={contact.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.email}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.location}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant={getSegmentBadgeVariant(contact.segment)}>
                      {contact.segment}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-gray-500">
                    {contact.status === 'online' ? 'Just now' : contact.lastActive}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {renderStarRating(contact.score)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center text-sm">
                    <button className="text-primary hover:text-primary/80 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredContacts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No contacts found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredContacts.length}</span> of <span className="font-medium">{contacts.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-primary text-white hover:bg-primary/90">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsTable;
