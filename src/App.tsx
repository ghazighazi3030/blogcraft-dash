import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="categories" element={<div className="p-6"><h1 className="text-2xl font-bold">Categories - Coming Soon</h1></div>} />
            <Route path="comments" element={<div className="p-6"><h1 className="text-2xl font-bold">Comments - Coming Soon</h1></div>} />
            <Route path="media" element={<div className="p-6"><h1 className="text-2xl font-bold">Media Library - Coming Soon</h1></div>} />
            <Route path="seo" element={<div className="p-6"><h1 className="text-2xl font-bold">SEO Management - Coming Soon</h1></div>} />
            <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics - Coming Soon</h1></div>} />
            <Route path="appearance" element={<div className="p-6"><h1 className="text-2xl font-bold">Appearance - Coming Soon</h1></div>} />
            <Route path="security" element={<div className="p-6"><h1 className="text-2xl font-bold">Security - Coming Soon</h1></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
