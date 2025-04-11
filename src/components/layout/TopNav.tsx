
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface TopNavProps {
  onMenuClick: () => void;
}

export const TopNav = ({ onMenuClick }: TopNavProps) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 md:px-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu />
        </Button>
      </div>
      
      <div className="hidden md:flex items-center rounded-md border border-input w-80 px-3 py-1 text-sm focus-within:ring-1 focus-within:ring-ring">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          className="w-full h-8 bg-transparent border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" 
          placeholder="ابحث..." 
          dir="rtl"
        />
      </div>
      
      <div className="flex items-center space-x-4 ml-1">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-100 text-blue-800">م</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
