
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
  iconColor?: string;
  iconBgColor?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel,
  className,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-100"
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {title}
            </CardDescription>
            <CardTitle className="text-2xl font-bold mt-1 text-gray-900">
              {value}
            </CardTitle>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                <div 
                  className={cn(
                    "text-xs font-medium rounded-full px-2 py-0.5",
                    trend > 0 
                      ? "text-green-700 bg-green-100" 
                      : trend < 0 
                        ? "text-red-700 bg-red-100"
                        : "text-gray-600 bg-gray-100"
                  )}
                >
                  {trend > 0 ? `+${trend}%` : trend < 0 ? `${trend}%` : `${trend}%`}
                </div>
                {trendLabel && (
                  <span className="text-xs text-muted-foreground mr-1.5">{trendLabel}</span>
                )}
              </div>
            )}
          </div>
          
          <div className={cn("p-3 rounded-lg", iconBgColor)}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
