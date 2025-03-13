import { Mail, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Chat } from '@/data/mockData';
import FlagIcon from '@/components/ui/flag-icon';
import { formatRelative } from 'date-fns';

interface DetailsPanelProps {
  activeChat: Chat | null;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ activeChat }) => {
  if (!activeChat) {
    return null;
  }
  
  const { person } = activeChat;

  return (
    <div className="hidden lg:flex flex-col w-80 bg-white border-l border-gray-200 flex-shrink-0">
      <div className="p-6 border-b border-gray-200 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={person.avatar} alt={person.name} className="object-cover" />
          <AvatarFallback className="text-lg">{person.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg text-gray-900">{person.name}</h3>
        <p className="text-sm text-gray-500">{person.role}</p>
        
        <div className="flex justify-center mt-4 space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="p-2 text-indigo-500 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white"
          >
            <Mail className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="p-2 text-indigo-500 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white"
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="p-2 text-indigo-500 border border-indigo-500 rounded-full hover:bg-indigo-500 hover:text-white"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="font-semibold text-gray-800 mb-4">User Information</h4>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-sm text-gray-900">{person.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <div className="flex items-center">
              <FlagIcon countryCode={person.location.countryCode} className="mr-2" />
              <p className="text-sm text-gray-900">{person.location.city}, {person.location.country}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Local Time</p>
            <p className="text-sm text-gray-900">{person.localTime}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Last Activity</p>
            <p className="text-sm text-gray-900">{formatRelative(new Date(person.lastActive), new Date())}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-4">Notes</h4>
          <Textarea 
            rows={3} 
            placeholder="Add notes about this contact..." 
            className="w-full p-3 bg-gray-100 rounded-md resize-none"
            defaultValue={person.notes || ''}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPanel;
