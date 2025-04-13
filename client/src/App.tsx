import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layouts/Main";
import Inbox from "@/pages/inbox";
import Contacts from "@/pages/contacts";
import Visitors from "@/pages/visitors";
import Settings from "@/pages/settings";
import Login from "./pages/login";
import { AuthProvider } from "@/context/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Signup from "./pages/signup";
import CreateWorkspace from "./pages/create-worspace";
import React from "react";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import WidgetCustomization from "./pages/widget-customization";
import LandingPage from "./pages/landing";

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/create-workspace">
        <ProtectedRoute>
          <CreateWorkspace />
        </ProtectedRoute>
      </Route>
      <Route path="/widget-customization">
        <ProtectedRoute>
          <WidgetCustomization />
        </ProtectedRoute>
      </Route>
      <Route>
        <ProtectedRoute>
          <PrivateRoutes />
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

function PrivateRoutes() {
  const [location] = useLocation();

  useEffect(() => {
    document.title = `ChatDash - ${location.substring(1) || "Inbox"}`;
  }, [location]);

  return (
    <MainLayout>
      <Switch>
        <Route path="/create-workspace" component={CreateWorkspace} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/visitors" component={Visitors} />
        <Route path="/settings" component={Settings} />
        {/* Settings sub-routes */}
        <Route path="/settings/availability" component={Settings} />
        <Route path="/settings/notifications" component={Settings} />
        <Route path="/settings/security" component={Settings} />
        <Route path="/settings/interface" component={Settings} />
        <Route path="/settings/workspace" component={Settings} />
        <Route path="/settings/teams" component={Settings} />
        <Route path="/settings/danger" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WorkspaceProvider>
          <PublicRoutes />
          <Toaster />
        </WorkspaceProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
