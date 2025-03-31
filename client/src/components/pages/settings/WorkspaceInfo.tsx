import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trash2, Upload } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { useWorkspace } from "@/context/WorkspaceContext";

const WorkspaceInformation = () => {
  const [workspaceIcon, setWorkspaceIcon] = useState<string>(
    "https://github.com/shadcn.png"
  );
  const { workspaceData } = useWorkspace();
  const handleFileSelect = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setWorkspaceIcon(imageUrl);
  };

  const handleRemoveIcon = () => {
    setWorkspaceIcon("https://github.com/shadcn.png");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Workspace Information</h2>
        <p className="text-sm text-gray-500">Manage your workspace details</p>
      </div>
      <div className="p-6">
        {/* Workspace Icon Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative group">
            <Avatar className="w-24 h-24 ring-2 ring-gray-100">
              <AvatarImage src={workspaceIcon} />
              <AvatarFallback>WS</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
              <FileUpload
                onFileSelect={handleFileSelect}
                accept="image/*"
                render={(onClick) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-black/20"
                    onClick={onClick}
                  >
                    <Upload className="h-5 w-5" />
                  </Button>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Workspace Icon
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Recommended: 200x200px (5MB max)
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleRemoveIcon}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Remove Icon
            </Button>
          </div>
        </div>

        {/* Workspace Details Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                className="mt-1"
                defaultValue={workspaceData?.workspace.businessName}
              />
            </div>

            <div>
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                placeholder="yourdomain.com"
                className="mt-1"
                defaultValue={workspaceData?.workspace.domain}
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="contact@yourbusiness.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceInformation;
