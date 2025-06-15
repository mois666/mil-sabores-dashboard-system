import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Usuarios from "@/pages/Usuarios";
import NotFound from "@/pages/NotFound";
import Clientes from "@/pages/Clientes";
import Productos from "@/pages/Productos";
import Ventas from "@/pages/Ventas";
import Ganancias from "@/pages/Ganancias";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-confiteria-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/usuarios" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Usuarios />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/clientes" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Clientes />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/productos" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Productos />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/ventas" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Ventas />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/ganancias" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Ganancias />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
