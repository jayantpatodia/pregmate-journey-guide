
import { Home, Calendar, MessageSquare, Activity, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      path: '/',
    },
    {
      label: 'Tracker',
      icon: Calendar,
      path: '/tracker',
    },
    {
      label: 'Ask AI',
      icon: MessageSquare,
      path: '/ask-ai',
    },
    {
      label: 'Health',
      icon: Activity,
      path: '/health',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg py-2 px-4">
      <nav className="flex justify-between items-center">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`pregbuddy-nav-item ${pathname === item.path ? 'active' : ''}`}
          >
            <item.icon size={20} className={pathname === item.path ? 'text-pregbuddy-dark' : 'text-gray-500'} />
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavigation;
