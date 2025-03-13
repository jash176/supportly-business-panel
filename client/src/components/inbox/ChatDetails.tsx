import { Phone, Video, Mail, Flag, Download, FileImage, FilePdf } from 'lucide-react';
import { users, sharedFiles } from '@/lib/mockData';

interface ChatDetailsProps {
  selectedChatId: string;
}

const ChatDetails = ({ selectedChatId }: ChatDetailsProps) => {
  const selectedUser = users.find(user => user.id === selectedChatId);
  
  if (!selectedUser) {
    return (
      <div className="hidden lg:flex w-80 border-l border-gray-200 bg-white items-center justify-center">
        <div className="text-gray-500 text-center p-4">
          <p>Select a chat to view details</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="hidden lg:block w-80 border-l border-gray-200 bg-white overflow-y-auto scrollbar-hide">
      <div className="p-6 flex flex-col items-center border-b border-gray-200">
        <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden mb-3">
          <img 
            src={selectedUser.avatar} 
            alt={selectedUser.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
        <p className="text-sm text-gray-500">Product Designer</p>
        <div className="flex space-x-2 mt-3">
          <button className="p-2 text-gray-500 hover:text-primary bg-gray-100 rounded-full">
            <Phone className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-primary bg-gray-100 rounded-full">
            <Video className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-primary bg-gray-100 rounded-full">
            <Mail className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4">Contact Details</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-sm">{selectedUser.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <div className="flex items-center">
              <Flag className="text-primary mr-2 h-4 w-4" />
              <p className="text-sm">{selectedUser.location}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Last Active</p>
            <p className="text-sm">{selectedUser.status === 'online' ? 'Currently Online' : selectedUser.lastActive}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Time Zone</p>
            <p className="text-sm">{selectedUser.timezone}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Shared Files</h3>
          <div className="space-y-3">
            {sharedFiles.map(file => (
              <div key={file.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                <div className={`${file.bgColor} p-2 rounded mr-3`}>
                  {file.type === 'image' ? (
                    <FileImage className="text-blue-500 h-4 w-4" />
                  ) : (
                    <FilePdf className="text-red-500 h-4 w-4" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size} · {file.uploadDate}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
