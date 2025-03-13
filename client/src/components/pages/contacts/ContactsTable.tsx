import { useState } from 'react';
import { Contact } from '@/data/mockData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Filter, Search } from 'lucide-react';
import FlagIcon from '@/components/ui/flag-icon';
import { formatDistanceToNow } from 'date-fns';

interface ContactsTableProps {
  contacts: Contact[];
}

const ContactsTable: React.FC<ContactsTableProps> = ({ contacts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredContacts = searchQuery.trim()
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

  return (
    <div className="flex-1 overflow-hidden flex flex-col h-full">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Contacts</h1>
          <div className="flex space-x-2">
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search contacts"
              className="w-full pl-10 pr-4 py-2 bg-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Segments
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FlagIcon countryCode={contact.location.countryCode} className="mr-2" />
                      <div className="text-sm text-gray-900">{contact.location.city}, {contact.location.country}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.segments.map((segment, index) => (
                      <span 
                        key={index}
                        className={`${index > 0 ? 'ml-1' : ''} px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          segment === 'Design' ? 'bg-green-100 text-green-800' :
                          segment === 'Product' ? 'bg-blue-100 text-blue-800' :
                          segment === 'Marketing' ? 'bg-purple-100 text-purple-800' :
                          segment === 'Sales' ? 'bg-red-100 text-red-800' :
                          segment === 'Support' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {segment}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(new Date(contact.lastActive), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg 
                          key={index} 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill={index < contact.score ? 'currentColor' : 'none'} 
                          stroke={index < contact.score ? 'none' : 'currentColor'}
                          className="w-4 h-4"
                        >
                          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="link" className="text-indigo-500 hover:text-indigo-900">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTable;
