import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, Copy, Check, Code } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateWidget } from "@/hooks/useUpdateWidget";

// Predefined widget colors
const widgetColors = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Pink", value: "#ec4899" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Indigo", value: "#6366f1" },
];

const WidgetCustomization = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const {mutateAsync: updateWidget} = useUpdateWidget();
  
  // Widget customization state
  const [widgetColor, setWidgetColor] = useState(widgetColors[0].value);
  const [position, setPosition] = useState("bottom-right");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi there! How can we help you today?");
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Integration dialog state
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const scriptRef = useRef<HTMLPreElement>(null);
  
  const integrationScript = `<script type="text/javascript">
    window.apiKey = "API_KEY"; // Replace API_KEY with your actual API key
    (function() {
    var d = document, s = d.createElement("script");
    s.src = "http://127.0.0.1:5501/dist/chatWidget.bundle.js";
    s.async = 1;
    s.onload = function() {
        console.log("window.ChatWidget : ", window.ChatWidget)
      if (window.ChatWidget && typeof window.ChatWidget.mount === "function") {
        window.ChatWidget.mount();
      }
    };
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
  </script>`;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image under 2MB"
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please select an image file"
        });
        return;
      }

      // Store the file object for later upload
      setAvatarFile(file);
      
      // Create a preview URL for display only
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('colorScheme', widgetColor);
      data.append('position', position);
      data.append('welcomeMessage', welcomeMessage);
      if (avatarFile) {
        data.append('avatarUrl', avatarFile);
      }
      
      // Use the updateWidget hook to save widget customization
      await updateWidget(data);

      toast({
        title: "Success",
        description: "Widget customization saved successfully!",
      });

      // Show integration dialog instead of navigating
      setShowIntegrationDialog(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save widget customization",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (scriptRef.current) {
      const range = document.createRange();
      range.selectNode(scriptRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Script copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleContinue = () => {
    setShowIntegrationDialog(false);
    setLocation("/inbox");
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

      <main className="container flex-1 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold text-gray-900">Customize Your Widget</h1>
            <p className="text-lg text-purple-600 mt-2">
              Personalize how your chat widget appears to your customers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-lg border border-purple-50">
            {/* Left side - Customization Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Widget Color */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Widget Color</Label>
                  <Select value={widgetColor} onValueChange={setWidgetColor}>
                    <SelectTrigger className="w-full border-purple-100 hover:border-purple-200 focus:ring-purple-500">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {widgetColors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-full mr-2 border border-gray-200" 
                              style={{ backgroundColor: color.value }}
                            />
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Widget Position */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Widget Position</Label>
                  <RadioGroup 
                    value={position} 
                    onValueChange={setPosition}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="bottom-left" 
                        id="bottom-left" 
                        className="text-purple-600 border-gray-300"
                      />
                      <Label htmlFor="bottom-left" className="text-gray-700">Bottom Left</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="bottom-right" 
                        id="bottom-right" 
                        className="text-purple-600 border-gray-300"
                      />
                      <Label htmlFor="bottom-right" className="text-gray-700">Bottom Right</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Welcome Message */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Welcome Message</Label>
                  <Input
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                {/* Avatar Upload */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Widget Avatar</Label>
                  <div className="mt-2 flex flex-col items-center">
                    <div className="mb-4">
                      <Avatar className="h-24 w-24 border-2 border-purple-100">
                        {avatarImage ? (
                          <AvatarImage src={avatarImage} alt="Uploaded avatar" />
                        ) : (
                          <AvatarFallback className="bg-purple-50">
                            <UploadCloud className="h-8 w-8 text-purple-600" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                    <label
                      htmlFor="avatar-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-100 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 2MB)</p>
                      </div>
                      <input
                        id="avatar-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 rounded-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save & Continue"}
                </Button>
              </form>
            </div>

            {/* Right side - Widget Preview */}
            <div className="relative h-[600px] rounded-lg p-4 bg-gray-900 border border-purple-100">
              <h3 className="text-lg font-medium mb-4 text-center">Widget Preview</h3>
              
              {/* Mock website container */}
              <div className="bg-white h-full rounded border relative overflow-hidden">
                <div className="h-10 bg-gray-100 border-b flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto text-xs text-gray-500">example.com</div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-bold">Your Website</h4>
                  <p className="text-sm text-gray-500">This is how your chat widget will appear on your website.</p>
                  
                  {/* Placeholder content */}
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
                
                {/* Widget Preview */}
                <div 
                  className={`absolute ${position === 'bottom-left' ? 'left-4' : 'right-4'} bottom-4 flex flex-col items-end`}
                  style={{ '--tw-shadow': '0 10px 15px -3px rgb(168 85 247 / 0.1)' } as React.CSSProperties}
                >
                  {/* Chat bubble */}
                  <div 
                    className="mb-2 p-3 rounded-lg shadow-lg max-w-xs text-white"
                    style={{ backgroundColor: widgetColor }}
                  >
                    <p className="text-sm">{welcomeMessage}</p>
                  </div>
                  
                  {/* Chat button */}
                  <button 
                    className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: widgetColor }}
                  >
                    <Avatar className="h-12 w-12 border-2 border-white">
                      {avatarImage ? (
                        <AvatarImage src={avatarImage} alt="Widget avatar" />
                      ) : (
                        <AvatarFallback style={{ backgroundColor: widgetColor }}>
                          ?
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Integration Dialog */}
      <Dialog open={showIntegrationDialog} onOpenChange={setShowIntegrationDialog}>
        <DialogContent className="sm:max-w-2xl rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-purple-900 flex items-center gap-2">
              <Code className="h-5 w-5 text-purple-600" />
              Add the Widget to Your Website
            </DialogTitle>
          </DialogHeader>
          
          <div className="bg-purple-50 p-4 rounded-md relative border border-purple-100">
            <pre 
              ref={scriptRef} 
              className="text-sm overflow-x-auto whitespace-pre-wrap break-all"
            >
              {integrationScript}
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 text-purple-600 hover:bg-purple-100"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button 
              onClick={handleContinue}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Continue to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WidgetCustomization;