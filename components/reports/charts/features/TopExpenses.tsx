// Top 5 Expense Categories (Horizontal Bar Chart)
// Purpose: Highlights the top 5 categories where users spend the most.
// Use Case: Helps users quickly see which areas are driving the majority of their expenses.

'use client';

import { IExpense, IViewChartOption, JSONObject } from '@/libs/definations';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    Treemap,
    XAxis,
    YAxis
} from 'recharts';
import { useCategory } from '@/contexts/CategoryContext';
import { groupExpenseByCategories } from '@/libs/utils/chartUtils';
import { capitalizeFirstLetter, formatCurrency } from '@/libs/utils';
import { format } from 'path';
import { parseISO } from 'date-fns';

export function TopExpenses({
    data,
    topN = 5,
    viewOptions
}: {
    data: IExpense[];
    topN?: number;
    viewOptions: IViewChartOption;
}) {
    const { categoryMap } = useCategory();
    const chartData = groupExpenseByCategories(data, categoryMap).slice(
        0,
        topN
    );
    return (
        <>
            {viewOptions.type === 'bar' && <CustomBarChart data={chartData} />}
        </>
    );
}

const CustomBarChart = ({ data }: { data: JSONObject[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 5, bottom: 30 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    type="number"
                    tick={{ fontSize: 12, dy: 20 }}
                    angle={-65}
                    tickFormatter={(value: number) => formatCurrency(value)}
                />
                <YAxis
                    dataKey="name"
                    type="category"
                    width={120}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="total" barSize={30} name="Total">
                    <LabelList
                        dataKey="total"
                        position="insideRight"
                        formatter={formatCurrency}
                        style={{
                            fontSize: 12,
                            fill: '#f44566',
                            fontWeight: 'bold'
                        }}
                    />
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
