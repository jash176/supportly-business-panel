import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
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

      // Create a preview URL
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
      data.append('color', widgetColor);
      data.append('position', position);
      data.append('welcomeMessage', welcomeMessage);
      if (avatarImage) {
        data.append('avatarImage', avatarImage);
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
    <>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Customize Your Widget</h1>
        <p className="text-center text-muted-foreground mb-10">
          Personalize how your chat widget appears to your customers
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left side - Customization Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Widget Color */}
              <div className="space-y-2">
                <Label htmlFor="widgetColor">Widget Color</Label>
                <Select
                  value={widgetColor}
                  onValueChange={setWidgetColor}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {widgetColors.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2" 
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
                <Label>Widget Position</Label>
                <RadioGroup 
                  value={position} 
                  onValueChange={setPosition}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bottom-left" id="bottom-left" />
                    <Label htmlFor="bottom-left">Bottom Left</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bottom-right" id="bottom-right" />
                    <Label htmlFor="bottom-right">Bottom Right</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Welcome Message */}
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Input
                  id="welcomeMessage"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  placeholder="Enter a welcome message for your visitors"
                />
              </div>

              {/* Avatar Image Upload */}
              <div className="space-y-2">
                <Label>Widget Avatar</Label>
                <div className="mt-2 flex flex-col items-center">
                  <div className="mb-4">
                    <Avatar className="h-24 w-24 border-2 border-muted">
                      {avatarImage ? (
                        <AvatarImage src={avatarImage} alt="Uploaded avatar" />
                      ) : (
                        <AvatarFallback className="bg-primary/10">
                          <UploadCloud className="h-8 w-8 text-muted-foreground" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="avatar-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
              </div>

              <Button 
                type="submit" 
                className="w-full mt-6" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save & Continue"}
              </Button>
            </form>
          </div>

          {/* Right side - Widget Preview */}
          <div className="relative h-[600px] border rounded-lg p-4 bg-gray-50">
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

      {/* Integration Guide Dialog */}
      <Dialog open={showIntegrationDialog} onOpenChange={setShowIntegrationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Add the Widget to Your Website
            </DialogTitle>
            <DialogDescription>
              Copy the following script tag and paste it into the <code>&lt;head&gt;</code> section of your website's HTML.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-muted p-4 rounded-md relative">
            <pre 
              ref={scriptRef} 
              className="text-sm overflow-x-auto whitespace-pre-wrap break-all"
            >
              {integrationScript}
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm">
            <p className="font-medium">Installation Instructions:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Copy the script above</li>
              <li>Replace <code>API_KEY</code> with your actual API key (check your welcome email)</li>
              <li>Paste it in the <code>&lt;head&gt;</code> section of your HTML</li>
              <li>Save your changes and refresh your website</li>
            </ol>
          </div>
          
          <DialogFooter className="sm:justify-center">
            <Button onClick={handleContinue}>
              Continue to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WidgetCustomization;