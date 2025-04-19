import { useState } from "react";
import {
  Mail,
  Phone,
  Video,
  X,
  UserPlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import FlagIcon from "@/components/ui/flag-icon";
import { formatRelative } from "date-fns";
import { Chat } from "@/lib/api/inbox";
import { generateInitials } from "@/lib/utils";

interface DetailsPanelProps {
  activeChat: Chat | null;
  isVisible: boolean;
  togglePanel: () => void;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({
  activeChat,
  isVisible,
  togglePanel,
}) => {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [isVisitorsDevicesExpanded, setIsVisitorsDevicesExpanded] =
    useState(false);
  const [isSegmentsExpanded, setIsSegmentsExpanded] = useState(false);

  if (!activeChat) {
    return null;
  }

  const person = activeChat;

  return (
    <>
      {/* Panel content */}
      <div
        className={`
        ${isVisible ? "fixed inset-0 z-50 bg-white" : "hidden"} 
        lg:relative lg:flex lg:flex-col lg:w-80 lg:bg-white lg:border-l lg:border-gray-200 lg:flex-shrink-0 lg:z-auto
      `}
      >
        {/* Mobile close button */}
        <div className="lg:hidden absolute top-4 right-4">
          <Button
            onClick={togglePanel}
            variant="ghost"
            size="icon"
            className="text-gray-500"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6 border-b border-gray-200 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="" alt={activeChat.name} />
            <AvatarFallback className="bg-indigo-100 text-indigo-600">
              {generateInitials(activeChat.name)}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg text-gray-900">{person.name}</h3>
        </div>

        {activeChat.metadata && (
          <div className="overflow-y-auto">
            <button
              onClick={() => setIsInfoExpanded(!isInfoExpanded)}
              className="flex justify-between items-center w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <h4 className="font-semibold text-gray-800 text-xs ">User Information</h4>
              {isInfoExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {isInfoExpanded && (
              <div className="space-y-4 p-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">
                    {activeChat?.customerEmail || "unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <div className="flex items-center ">
                    {activeChat.metadata.geolocation?.countryCode &&
                      activeChat.metadata.geolocation?.countryCode !==
                        "unknwon" && (
                        <FlagIcon
                          countryCode={
                            activeChat.metadata.geolocation?.countryCode
                          }
                          className="mr-2"
                        />
                      )}
                    <p className="text-sm text-gray-900">
                      {activeChat.metadata.geolocation?.city},{" "}
                      {activeChat.metadata.geolocation?.country}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Last Activity</p>
                  <p className="text-sm text-gray-900">
                    {formatRelative(
                      new Date(activeChat.lastMessageTime),
                      new Date()
                    )}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() =>
                setIsVisitorsDevicesExpanded(!isVisitorsDevicesExpanded)
              }
              className="flex justify-between items-center w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 transition-colors text-xs border-t"
            >
              <h4 className="font-semibold text-gray-800">Visitors Device</h4>
              {isVisitorsDevicesExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            {isVisitorsDevicesExpanded && (
              <div className="space-y-4 p-4 border-t">

                <div>
                  <div className="flex items-center ">
                    {activeChat.metadata?.system?.browserName &&
                      activeChat.metadata.system?.browserName !==
                        "unknwon" && (
                        <img src={`https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/${activeChat.metadata.system?.browserName.toLowerCase()}/${activeChat.metadata.system?.browserName.toLowerCase()}_24x24.png`} />
                      )}
                    <p className="text-sm text-gray-900 ml-3">
                      {activeChat.metadata.system?.browserName}{" "}
                      {activeChat.metadata.system?.browserVersion} on {" "} {activeChat.metadata.system?.osName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsPanel;
