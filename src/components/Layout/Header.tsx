
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Settings } from 'lucide-react';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Panel de Control
        </h2>
      </div>

      <div className="flex items-center space-x-4">
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
    </header>
  );
};

export default Header;
