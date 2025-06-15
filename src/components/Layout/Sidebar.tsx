
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Grid2x2, 
  Calendar, 
  FileText, 
  BookOpen,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      roles: ['Administrador', 'Recepcionista']
    },
    {
      title: 'Gestión de Usuarios',
      href: '/usuarios',
      icon: User,
      roles: ['Administrador']
    },
    {
      title: 'Gestión de Clientes',
      href: '/clientes',
      icon: Grid2x2,
      roles: ['Administrador', 'Recepcionista']
    },
    {
      title: 'Gestión de Productos',
      href: '/productos',
      icon: BookOpen,
      roles: ['Administrador', 'Recepcionista']
    },
    {
      title: 'Registro de Ventas',
      href: '/ventas',
      icon: Calendar,
      roles: ['Administrador', 'Recepcionista']
    },
    {
      title: 'Ganancias',
      href: '/ganancias',
      icon: FileText,
      roles: ['Administrador']
    }
  ];

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 h-screen bg-confiteria-sidebar-light dark:bg-confiteria-sidebar-dark text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-600">
        <h1 className="text-xl font-bold text-confiteria-primary">Mil Sabores</h1>
        <p className="text-sm text-gray-300 mt-1">Confitería</p>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-confiteria-primary flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm">{user?.fullName}</p>
            <p className="text-xs text-gray-300">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                    isActive
                      ? "bg-confiteria-primary text-white font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-600">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
