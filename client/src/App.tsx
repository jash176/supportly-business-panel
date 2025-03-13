import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import InboxPage from "@/pages/inbox";
import ContactsPage from "@/pages/contacts";
import VisitorsPage from "@/pages/visitors";
import SettingsPage from "@/pages/settings";
import AppLayout from "@/components/layouts/AppLayout";

function Router() {
  const [location] = useLocation();
  
  return (
    <AppLayout currentPath={location}>
      <Switch>
        <Route path="/" component={InboxPage} />
        <Route path="/inbox" component={InboxPage} />
        <Route path="/contacts" component={ContactsPage} />
        <Route path="/visitors" component={VisitorsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/settings/:section" component={SettingsPage} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
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
