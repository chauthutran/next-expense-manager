import { JSONObject } from '@/libs/definations';
import { formatCurrency } from '@/libs/utils';
import {
    Cell,
    Label,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

export default function CustomDoughnutChart({ data }: { data: JSONObject[] }) {
    const total = data.reduce((acc, item) => (acc += item.total), 0);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    dataKey="total"
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    fill="#82ca9d"
                    label={({ name, total, percent }) =>
                        `${formatCurrency(total)}`
                    }
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                
                <Pie
                    data={[{ name: 'Total', value: total }]}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    fill="#FFFFFF"
                    outerRadius={60}
                >
                    <Label
                        value={formatCurrency(total)}
                        position="center"
                        className="text-sm font-semibold fill-gray-700"
                    />
                </Pie>

                <Tooltip
                    formatter={(value: number, name: string) => [
                        formatCurrency(total),
                        name
                    ]}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
