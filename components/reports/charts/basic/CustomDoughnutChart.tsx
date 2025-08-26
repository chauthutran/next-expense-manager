import { JSONObject } from '@/libs/definations';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export default function CustomDoughnutChart({ data }: { data: JSONObject[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
               <Pie
                    dataKey="total"
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
