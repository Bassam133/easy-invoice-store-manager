
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
  name: string;
  revenue: number;
  profit: number;
}

interface RevenueChartProps {
  data: ChartData[];
  title: string;
  description?: string;
}

export const RevenueChart = ({ data, title, description }: RevenueChartProps) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#888888' }} 
              tickLine={{ stroke: '#888888' }} 
            />
            <YAxis 
              tick={{ fill: '#888888' }} 
              tickLine={{ stroke: '#888888' }}
              tickFormatter={(value) => `${value.toLocaleString()} ر.س`} 
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} ر.س`, undefined]}
              labelStyle={{ textAlign: 'right', direction: 'rtl' }}
            />
            <Legend />
            <Bar dataKey="revenue" name="المبيعات" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit" name="الأرباح" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
