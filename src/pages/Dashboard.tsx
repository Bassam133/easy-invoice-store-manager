
import { StatCard } from "@/components/dashboard/StatCard";
import { BarChart4, CreditCard, DollarSign, Package, ShoppingBag } from "lucide-react";
import { formatCurrency, getInventoryValue, getLowStockItems, getPendingInvoicesValue, getTotalRevenue, orders, products, invoices } from "@/lib/data";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InventoryTable } from "@/components/dashboard/InventoryTable";
import { InvoiceList } from "@/components/invoices/InvoiceList";
import { formatDate } from "@/lib/data";

const Dashboard = () => {
  // Generate sample chart data
  const monthlyData = [
    { name: "يناير", revenue: 48000, profit: 15000 },
    { name: "فبراير", revenue: 52000, profit: 16000 },
    { name: "مارس", revenue: 61000, profit: 19000 },
    { name: "أبريل", revenue: 64000, profit: 21000 },
    { name: "مايو", revenue: 58000, profit: 18000 },
    { name: "يونيو", revenue: 71000, profit: 22000 }
  ];

  // Get data for statistics
  const inventoryValue = getInventoryValue();
  const totalRevenue = getTotalRevenue();
  const pendingInvoices = getPendingInvoicesValue();
  const lowStockItems = getLowStockItems(5).length;
  
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">لوحة المعلومات</h1>
        <p className="text-muted-foreground">نظرة عامة على أعمالك ومبيعاتك</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="إجمالي المبيعات"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          trend={12}
          trendLabel="من الشهر الماضي"
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="قيمة المخزون"
          value={formatCurrency(inventoryValue)}
          icon={Package}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="طلبات جديدة"
          value={orders.filter(o => o.status === 'pending').length}
          icon={ShoppingBag}
          trend={5}
          trendLabel="من الأسبوع الماضي"
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatCard
          title="فواتير معلقة"
          value={formatCurrency(pendingInvoices)}
          icon={CreditCard}
          trend={-2}
          trendLabel="من الشهر الماضي"
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
        />
      </div>

      <RevenueChart 
        data={monthlyData} 
        title="الإيرادات والأرباح"
        description="تحليل الإيرادات والأرباح خلال الأشهر الماضية"
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">المنتجات الحالية</h2>
          <InventoryTable products={products} formatCurrency={formatCurrency} />
        </div>
        
        <InvoiceList 
          invoices={invoices} 
          formatCurrency={formatCurrency} 
          formatDate={formatDate}
        />
      </div>
    </div>
  );
};

export default Dashboard;
