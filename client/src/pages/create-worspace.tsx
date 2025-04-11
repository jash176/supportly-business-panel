import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCreateWorkspaceMutation } from "@/hooks/useCreateWorkspaceMutation";
import { useLocation } from "wouter";
import { Link } from "wouter";

interface WorkspaceErrors {
  businessName?: string;
  website?: string;
}

const CreateWorkspace = () => {
  const { toast } = useToast();
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<WorkspaceErrors>({});
  const createWorkspaceMutation = useCreateWorkspaceMutation();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Basic validation
    const newErrors: WorkspaceErrors = {};

    if (!businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!website.trim()) {
      newErrors.website = "Website is required";
    } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(website)) {
      newErrors.website = "Please enter a valid website domain";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createWorkspaceMutation.mutateAsync({
        businessName,
        domain: website,
      });
      // Navigate to widget customization page instead of inbox
      setLocation("/widget-customization");
      toast({
        title: "Success",
        description: "Workspace created successfully! Now let's customize your widget.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create workspace",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-purple-50">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-purple-900">Supportly</span>
        </div>
        <Link href="/login">
          <Button variant="ghost" className="text-purple-700 hover:text-purple-800 hover:bg-purple-50">
            Sign In
          </Button>
        </Link>
      </header>

      <main className="container flex flex-1 items-center justify-center py-10">
        <div className="mx-auto max-w-md w-full space-y-8 px-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create Workspace</h1>
            <p className="text-muted-foreground text-purple-600">
              Set up your business workspace to get started
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-purple-50">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-gray-700">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Your Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={`rounded-lg ${errors.businessName ? "border-red-500" : "focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}`}
                />
                {errors.businessName && (
                  <p className="text-sm text-red-500">{errors.businessName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-gray-700">
                  Website Domain
                </Label>
                <Input
                  id="website"
                  placeholder="yourdomain.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className={`rounded-lg ${errors.website ? "border-red-500" : "focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}`}
                />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 rounded-lg"
              disabled={createWorkspaceMutation.isPending}
            >
              {createWorkspaceMutation.isPending ? "Creating..." : "Continue Setup"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateWorkspace;
