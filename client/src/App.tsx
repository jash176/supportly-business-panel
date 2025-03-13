import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layouts/Main";
import Inbox from "@/pages/Inbox";
import Contacts from "@/pages/Contacts";
import Visitors from "@/pages/Visitors";
import Settings from "@/pages/Settings";

function Router() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Update active status in sidebar when route changes
    document.title = `ChatDash - ${location.substring(1) || 'Inbox'}`;
  }, [location]);

  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Inbox} />
        <Route path="/inbox" component={Inbox} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/visitors" component={Visitors} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
