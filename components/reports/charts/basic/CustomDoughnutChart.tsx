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

const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
    total
}: any) => {
    if (percent < 0.05) return null; // hide labels < 5%
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="#333"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={12}
        >
            {formatCurrency(total)}
        </text>
    );
};

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
                    // innerRadius={65}
                    // outerRadius={90}
                    // outerRadius="80%"
                    innerRadius="50%"
                    outerRadius="70%"
                    labelLine={true}
                    label={renderCustomLabel}
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
                    // outerRadius={60}
                    outerRadius="50%"
                    fill="#FFFFFF"
                >
                    <Label
                        value={formatCurrency(total)}
                        position="center"
                        className="text-sm font-semibold fill-gray-700"
                    />
                </Pie>

                <Tooltip
                    formatter={(value: number, name: string) => [
                        formatCurrency(value),
                        name
                    ]}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
