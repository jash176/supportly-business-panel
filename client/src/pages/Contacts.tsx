import { useState, useEffect } from "react";
import ContactsTable from "@/components/pages/contacts/ContactsTable";
import MobileAppDownload from "@/components/MobileAppDownload";
import { useGetContacts } from "@/hooks/useGetContacts";

const Contacts: React.FC = () => {
  const { data: contacts } = useGetContacts();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  if (isMobile && location.pathname !== "/settings") {
    return <MobileAppDownload />;
  }

  return (
    <div className="flex flex-1 overflow-hidden h-full">
      <ContactsTable contacts={contacts} />
    </div>
  );
};

export default Contacts;