
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Package, ShoppingBag, FileText, BarChart4, Settings, ChevronRight, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SideNavProps {
  collapsed: boolean;
  onToggle: () => void;
}

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

export const SideNav = ({ collapsed, onToggle }: SideNavProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navigation: NavItem[] = [
    { name: 'الرئيسية', path: '/', icon: Home },
    { name: 'المنتجات', path: '/products', icon: Package },
    { name: 'المبيعات', path: '/sales', icon: ShoppingBag },
    { name: 'الفواتير', path: '/invoices', icon: FileText },
    { name: 'التقارير', path: '/reports', icon: BarChart4 },
    { name: 'الإعدادات', path: '/settings', icon: Settings },
  ];

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex flex-col bg-white border-l border-gray-200 transition-all duration-300 shadow-sm md:relative",
        collapsed ? "w-16" : "w-64"
      )}
      dir="rtl"
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <h2 className="text-xl font-bold text-gray-800">المخزون الذكي</h2>
        )}
        <button 
          onClick={onToggle} 
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
          aria-label={collapsed ? "توسيع القائمة" : "طي القائمة"}
        >
          {collapsed ? <ChevronRight size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = currentPath === item.path;
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2.5 text-base rounded-md transition-all",
                isActive 
                  ? "bg-blue-50 text-blue-700 font-medium" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <IconComponent size={20} className={cn("flex-shrink-0", collapsed ? "mx-auto" : "ml-3")} />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
