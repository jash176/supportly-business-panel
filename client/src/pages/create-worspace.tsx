import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCreateWorkspaceMutation } from "@/hooks/useCreateWorkspaceMutation";
import { useLocation } from "wouter";

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
      setLocation("/inbox");
      toast({
        title: "Success",
        description: "Workspace created successfully!",
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
    <div className="flex min-h-screen flex-col">
      <main className="container flex flex-1 items-center justify-center py-10">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create Your Workspace</h1>
            <p className="text-muted-foreground">
              Set up your business workspace to get started with Supportly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">
                Business Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="businessName"
                placeholder="Your Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className={errors.businessName ? "border-red-500" : ""}
              />
              {errors.businessName && (
                <p className="text-sm text-red-500">{errors.businessName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">
                Website <span className="text-red-500">*</span>
              </Label>
              <Input
                id="website"
                placeholder="yourdomain.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={errors.website ? "border-red-500" : ""}
              />
              {errors.website && (
                <p className="text-sm text-red-500">{errors.website}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={createWorkspaceMutation.isPending}
            >
              {createWorkspaceMutation.isPending
                ? "Creating..."
                : "Create Workspace"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateWorkspace;
