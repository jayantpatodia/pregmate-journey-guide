
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PregnancyProvider, usePregnancy } from "./context/PregnancyContext";
import BottomNavigation from "./components/BottomNavigation";

// Pages
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import AskAI from "./pages/AskAI";
import Tracker from "./pages/Tracker";
import Health from "./pages/Health";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Route guard for authenticated routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isOnboarded } = usePregnancy();
  
  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Layout with bottom navigation
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <BottomNavigation />
    </div>
  );
};

const AppRoutes = () => {
  const { isOnboarded } = usePregnancy();
  
  return (
    <Routes>
      <Route path="/onboarding" element={!isOnboarded ? <Onboarding /> : <Navigate to="/" replace />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout>
            <Home />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/ask-ai" element={
        <ProtectedRoute>
          <MainLayout>
            <AskAI />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/tracker" element={
        <ProtectedRoute>
          <MainLayout>
            <Tracker />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/health" element={
        <ProtectedRoute>
          <MainLayout>
            <Health />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PregnancyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </PregnancyProvider>
  </QueryClientProvider>
);

export default App;
