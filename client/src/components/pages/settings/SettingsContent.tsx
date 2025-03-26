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

const AccountInformation = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Account Information</h2>
        <p className="text-sm text-gray-500">
          Update your personal information
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start mb-6">
          <div className="mb-4 md:mb-0 md:mr-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <Button variant="outline" className="mr-2">
                <Upload className="mr-2 h-4 w-4" /> Upload New Photo
              </Button>
              <Button variant="ghost" className="text-gray-500">
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Recommended dimensions: 200x200px. Maximum file size: 5MB.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </Label>
            <Input id="firstName" defaultValue="John" />
          </div>

          <div>
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </Label>
            <Input id="lastName" defaultValue="Doe" />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
            />
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>

          <div>
            <Label
              htmlFor="jobTitle"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Job Title
            </Label>
            <Input id="jobTitle" defaultValue="Product Manager" />
          </div>

          <div>
            <Label
              htmlFor="department"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Department
            </Label>
            <Select defaultValue="product">
              <SelectTrigger id="department">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8">
          <Label
            htmlFor="bio"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </Label>
          <Textarea
            id="bio"
            rows={4}
            defaultValue="Product Manager with 5+ years of experience in SaaS products. Passionate about building tools that improve team productivity and collaboration."
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
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
