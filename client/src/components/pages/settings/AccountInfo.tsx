import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Upload } from "lucide-react";
import React from "react";
import { useAuth } from "@/context/auth";

const AccountInfo = () => {
  const { user } = useAuth(); // Assumes a user object is available

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
              {user?.avatar ? (
                <AvatarImage src={user.avatar} alt={`${user.name}`} />
              ) : (
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase() || "P"}
                </AvatarFallback>
              )}
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
            <Input id="firstName" defaultValue={user?.name || ""} />
          </div>

          <div>
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </Label>
            <Input id="lastName" defaultValue={user?.lastName || ""} />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </Label>
            <Input id="email" type="email" defaultValue={user?.email || ""} />
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </Label>
            <Input id="phone" type="tel" defaultValue={user?.phone || ""} />
          </div>
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

export default AccountInfo;
