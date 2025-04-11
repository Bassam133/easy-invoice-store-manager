
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Product } from "@/lib/data";
import { Badge } from "../ui/badge";

interface InventoryTableProps {
  products: Product[];
  formatCurrency: (amount: number) => string;
}

export const InventoryTable = ({ products, formatCurrency }: InventoryTableProps) => {
  return (
    <div className="rounded-md border">
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">المنتج</TableHead>
            <TableHead className="text-right">التصنيف</TableHead>
            <TableHead className="text-right">السعر</TableHead>
            <TableHead className="text-right">المخزون</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    product.stock > 10
                      ? "border-green-200 bg-green-50 text-green-700"
                      : product.stock > 0
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }
                >
                  {product.stock > 10
                    ? "متوفر"
                    : product.stock > 0
                    ? "منخفض"
                    : "غير متوفر"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
