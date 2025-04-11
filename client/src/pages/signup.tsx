import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRegisterMutation } from "@/hooks/useRegisterMutation";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "wouter";

const Signup = () => {
  const { toast } = useToast();
  const registerMutation = useRegisterMutation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [, setLocation] = useLocation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Basic validation
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await registerMutation.mutateAsync({
        name: username,
        email,
        password,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during login",
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
            <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
            <p className="text-muted-foreground text-purple-600">
              Join thousands of teams using Supportly
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-purple-50">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`rounded-lg ${errors.username ? "border-red-500" : "focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}`}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`rounded-lg ${errors.email ? "border-red-500" : "focus:border-purple-500 focus:ring-1 focus:ring-purple-500"}`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`rounded-lg ${errors.password ? "border-red-500 pr-10" : "focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`rounded-lg ${errors.confirmPassword ? "border-red-500 pr-10" : "focus:border-purple-500 focus:ring-1 focus:ring-purple-500 pr-10"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11 rounded-lg"
            >
              Create Account
            </Button>

            <p className="text-xs text-center text-gray-600">
              By creating an account, you agree to our{" "}
              <Link href="#" className="font-medium text-purple-600 hover:text-purple-700 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-medium text-purple-600 hover:text-purple-700 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-purple-600 hover:text-purple-700 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
