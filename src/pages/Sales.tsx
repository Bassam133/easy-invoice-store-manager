
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { customers, formatCurrency, formatDate, getCustomer, orders } from "@/lib/data";
import { Download, FileText, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredOrders = orders.filter(order => {
    const customer = getCustomer(order.customerId);
    const matchesSearch = 
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.id.toString().includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === "all" || 
      order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return "border-green-200 bg-green-50 text-green-700";
      case 'pending':
        return "border-amber-200 bg-amber-50 text-amber-700";
      case 'cancelled':
        return "border-red-200 bg-red-50 text-red-700";
      default:
        return "";
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return "مكتمل";
      case 'pending':
        return "قيد الانتظار";
      case 'cancelled':
        return "ملغى";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">المبيعات</h1>
          <p className="text-muted-foreground">إدارة طلبات العملاء والمبيعات</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <Download size={16} />
            <span>تصدير</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>طلب جديد</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>قائمة الطلبات</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  className="w-full md:w-64 pl-3 pr-9" 
                  placeholder="بحث عن طلب..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="حالة الطلب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="pending">قيد الانتظار</SelectItem>
                  <SelectItem value="cancelled">ملغى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">رقم الطلب</TableHead>
                  <TableHead className="text-right">العميل</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">المجموع</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const customer = getCustomer(order.customerId);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{customer?.name || "عميل غير معروف"}</TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getOrderStatusColor(order.status)}
                        >
                          {getOrderStatusText(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>تفاصيل</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {filteredOrders.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                لم يتم العثور على طلبات تطابق معايير البحث
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
