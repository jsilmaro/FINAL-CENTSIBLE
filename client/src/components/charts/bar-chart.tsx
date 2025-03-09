import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { getCurrencySymbol } from "@/lib/utils";

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
}

export default function BarChart({ data, title }: BarChartProps) {
  const { user } = useAuth();
  const currencySymbol = getCurrencySymbol(user?.currency || "USD");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${currencySymbol}${value.toFixed(2)}`, 'Amount']}
              />
              <Bar
                dataKey="value"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}