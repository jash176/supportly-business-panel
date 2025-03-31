import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Trash2 } from "lucide-react";
import AgentsAndTeams from "./AgentsAndTeams";
import WorkspaceInformation from "./WorkspaceInfo";
import AvailabilityScreen from "./Availability";
import AccountInfo from "./AccountInfo";

const AccountInformation = () => {
  return <AccountInfo />;
};

const Availability = () => <AvailabilityScreen />;

const Notifications = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Notification Preferences</h2>
      <p className="text-sm text-gray-500">
        Manage how and when you receive notifications
      </p>
    </div>
    <div className="p-6">
      <p className="text-gray-500">Notification settings content goes here</p>
    </div>
  </div>
);

const Security = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Security Settings</h2>
      <p className="text-sm text-gray-500">
        Manage your password and security preferences
      </p>
    </div>
    <div className="p-6">
      <p className="text-gray-500">Security settings content goes here</p>
    </div>
  </div>
);

const Interface = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Interface Settings</h2>
      <p className="text-sm text-gray-500">
        Customize the appearance of your dashboard
      </p>
    </div>
    <div className="p-6">
      <p className="text-gray-500">Interface settings content goes here</p>
    </div>
  </div>
);

const WorkspaceInfo = () => <WorkspaceInformation />;

const TeamsAndAgents = () => <AgentsAndTeams />;

const DangerZone = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 border border-red-200">
    <div className="px-6 py-4 border-b border-red-200 bg-red-50">
      <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
      <p className="text-sm text-red-500">
        Irreversible and destructive actions
      </p>
    </div>
    <div className="p-6">
      <div className="bg-red-50 p-4 rounded-md mb-4">
        <h3 className="text-md font-medium text-red-800 mb-2">Warning</h3>
        <p className="text-sm text-red-600">
          The following actions are irreversible. Please proceed with caution.
        </p>
      </div>
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-md p-4">
          <h4 className="font-semibold mb-2">Delete Workspace</h4>
          <p className="text-sm text-gray-500 mb-4">
            This will permanently delete your workspace and all associated data.
          </p>
          <Button variant="destructive">Delete Workspace</Button>
        </div>
      </div>
    </div>
  </div>
);

const SettingsContent: React.FC = () => {
  const [location] = useLocation();

  // Determine which content to show based on the current route
  const renderContent = () => {
    if (location === "/settings" || location === "/") {
      return <AccountInformation />;
    } else if (location === "/settings/availability") {
      return <Availability />;
    } else if (location === "/settings/notifications") {
      return <Notifications />;
    } else if (location === "/settings/security") {
      return <Security />;
    } else if (location === "/settings/interface") {
      return <Interface />;
    } else if (location === "/settings/workspace") {
      return <WorkspaceInfo />;
    } else if (location === "/settings/teams") {
      return <TeamsAndAgents />;
    } else if (location === "/settings/danger") {
      return <DangerZone />;
    }

    // Fallback to account information
    return <AccountInformation />;
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">{renderContent()}</div>
    </div>
  );
};

export default SettingsContent;
