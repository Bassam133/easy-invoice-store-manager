
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer, Invoice, getCustomer } from "@/lib/data";
import { EyeIcon, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface InvoiceListProps {
  invoices: Invoice[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const InvoiceList = ({ invoices, formatCurrency, formatDate }: InvoiceListProps) => {
  const getInvoiceStatusColor = (status: Invoice['status']) => {
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

  const getInvoiceStatusText = (status: Invoice['status']) => {
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">الفواتير الأخيرة</CardTitle>
        <CardDescription>آخر الفواتير التي تم إصدارها</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {invoices.map((invoice) => {
            const customer = getCustomer(invoice.customerId);
            return (
              <div
                key={invoice.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg"
                dir="rtl"
              >
                <div className="flex items-center mb-2 md:mb-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      فاتورة #{invoice.id}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {customer?.name} - {formatDate(invoice.issuedDate)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 w-full md:w-auto">
                  <Badge
                    variant="outline"
                    className={getInvoiceStatusColor(invoice.status)}
                  >
                    {getInvoiceStatusText(invoice.status)}
                  </Badge>
                  
                  <div className="text-sm md:text-base font-medium text-right md:ml-4">
                    {formatCurrency(invoice.total)}
                  </div>
                  
                  <Link to={`/invoices/${invoice.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <EyeIcon size={16} />
                      <span>عرض</span>
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
