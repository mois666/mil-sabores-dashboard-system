
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated, isLoading } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Por favor ingrese usuario y contraseña',
        variant: 'destructive',
      });
      return;
    }

    const success = await login(username, password);
    
    if (!success) {
      toast({
        title: 'Error de autenticación',
        description: 'Usuario o contraseña incorrectos',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Bienvenido',
        description: 'Inicio de sesión exitoso',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-confiteria-primary/10 to-confiteria-secondary/10 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-4 right-4">
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>{isDarkMode ? 'Modo Día' : 'Modo Noche'}</span>
        </Button>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-confiteria-primary">
            Mil Sabores
          </CardTitle>
          <CardDescription>
            Sistema de Gestión de Confitería
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese su usuario"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-confiteria-primary hover:bg-confiteria-accent"
              disabled={isLoading}
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Usuarios de prueba:</h4>
            <div className="text-sm space-y-1">
              <p><strong>Administrador:</strong> admin / admin123</p>
              <p><strong>Recepcionista:</strong> recepcionista / recep123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
