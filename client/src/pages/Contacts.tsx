import ContactsTable from '@/components/pages/contacts/ContactsTable';
import { contacts } from '@/data/mockData';

const Contacts: React.FC = () => {
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <ContactsTable contacts={contacts} />
    </div>
  );
};

export default Contacts;
