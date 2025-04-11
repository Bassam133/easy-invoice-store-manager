
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate, getCustomer, invoices } from "@/lib/data";
import { Download, EyeIcon, FileText, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredInvoices = invoices.filter(invoice => {
    const customer = getCustomer(invoice.customerId);
    const matchesSearch = 
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      invoice.id.toString().includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === "all" || 
      invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return "border-green-200 bg-green-50 text-green-700";
      case 'unpaid':
        return "border-amber-200 bg-amber-50 text-amber-700";
      case 'overdue':
        return "border-red-200 bg-red-50 text-red-700";
      default:
        return "";
    }
  };

  const getInvoiceStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return "مدفوعة";
      case 'unpaid':
        return "غير مدفوعة";
      case 'overdue':
        return "متأخرة";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">الفواتير</h1>
          <p className="text-muted-foreground">إدارة فواتير العملاء والمدفوعات</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <Download size={16} />
            <span>تصدير</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>فاتورة جديدة</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>قائمة الفواتير</CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  className="w-full md:w-64 pl-3 pr-9" 
                  placeholder="بحث عن فاتورة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="حالة الفاتورة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="paid">مدفوعة</SelectItem>
                  <SelectItem value="unpaid">غير مدفوعة</SelectItem>
                  <SelectItem value="overdue">متأخرة</SelectItem>
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
                  <TableHead className="text-right">رقم الفاتورة</TableHead>
                  <TableHead className="text-right">العميل</TableHead>
                  <TableHead className="text-right">تاريخ الإصدار</TableHead>
                  <TableHead className="text-right">تاريخ الاستحقاق</TableHead>
                  <TableHead className="text-right">المجموع</TableHead>
                  <TableHead className="text-right">الحالة</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const customer = getCustomer(invoice.customerId);
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">#{invoice.id}</TableCell>
                      <TableCell>{customer?.name || "عميل غير معروف"}</TableCell>
                      <TableCell>{formatDate(invoice.issuedDate)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>{formatCurrency(invoice.total)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getInvoiceStatusColor(invoice.status)}
                        >
                          {getInvoiceStatusText(invoice.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {filteredInvoices.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                لم يتم العثور على فواتير تطابق معايير البحث
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
