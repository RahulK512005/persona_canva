import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import ThemeToggle from './ThemeToggle';

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/leadership-dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Daily Reflection',
      path: '/daily-reflection',
      icon: 'BookOpen'
    },
    {
      label: 'AI Insights',
      path: '/ai-analysis-results',
      icon: 'Brain'
    },
    {
      label: 'Team Feedback',
      path: '/team-feedback-dashboard',
      icon: 'Users'
    },
    {
      label: 'Learning',
      path: '/learning-resources',
      icon: 'GraduationCap'
    },
    {
      label: 'History',
      path: '/leadership-history',
      icon: 'History'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/leadership-dashboard" 
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
                onClick={closeMobileMenu}
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Mirror" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">
                  Leadership Mirror
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 hover:scale-105 ${
                      isActiveRoute(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-elevation-2'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <Icon 
                    name={isMobileMenuOpen ? "X" : "Menu"} 
                    size={24} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' :'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center space-x-3 ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default NavigationBar;