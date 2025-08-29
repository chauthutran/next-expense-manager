// Expense Distribution by Category (Pie/Donut Chart)
// Purpose: Shows how a user’s expenses are distributed across different categories (e.g., food, rent, utilities, entertainment).
// Use Case: Helps users identify which categories consume the largest portion of their budget.

import { IExpense, IViewChartOption, JSONObject } from '@/libs/definations';
import React from 'react';
import { useCategory } from '@/contexts/CategoryContext';
import CustomBarChart from '../basic/CustomBarChart';
import CustomDoughnutChart from '../basic/CustomDoughnutChart';
import {
    groupExpenseByCategories,
    transformTreeMapData
} from '@/libs/utils/chartUtils';
import CustomTreeMap from '../basic/CustomTreeMap';
import {
    Bar,
    CartesianGrid,
    Cell,
    ComposedChart,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import { formatCurrency } from '@/libs/utils';

export default function CategoryWiseExpenses({
    data,
    viewOptions
}: {
    data: IExpense[];
    viewOptions: IViewChartOption;
}) {
    const { categoryMap } = useCategory();

    return (
        <>
            {viewOptions.type === 'bar' && (
                <CustomBarChart
                    data={groupExpenseByCategories(data, categoryMap)}
                    dataKeys={[{ name: 'total' }]}
                />
            )}

            {viewOptions.type === 'doughnut' && (
                <CustomDoughnutChart
                    data={groupExpenseByCategories(data, categoryMap)}
                />
            )}

            {viewOptions.type === 'pareto' && (
                <ParetoChart
                    data={groupExpenseByCategories(data, categoryMap)}
                />
            )}

            {viewOptions.type === 'treemap' && (
                <CustomTreeMap data={transformTreeMapData(data, categoryMap)} />
            )}
        </>
    );
}

const ParetoChart = ({ data }: { data: JSONObject[] }) => {
    const paretoData = () => {
        const total = data.reduce((sum, item) => (sum += item.total), 0);
        let cumulative = 0;

        return data.map((item) => {
            cumulative += item.total;
            return {
                name: item.name,
                value: item.total,
                cumulativePercent: parseFloat(
                    ((cumulative / total) * 100).toFixed(2)
                )
            };
        });
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={paretoData()}
                margin={{ top: 20, right: 50, left: 30, bottom: 30 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    yAxisId="left"
                    label={{
                        value: 'Expense ($)',
                        angle: -90,
                        position: 'left',
                        fontSize: 12,
                        offset: 25
                    }}
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatCurrency}
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                        value: 'Cumulative %',
                        angle: -90,
                        position: 'insideRight',
                        fontSize: 12,
                        offset: 10
                    }}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value: number) => `${value}%`}
                    domain={[0, 100]}
                />
                <Tooltip
                    formatter={(value: any, name: any) =>
                        name === 'cumulativePercent' ? `${value}%` : `$${value}`
                    }
                />
                <Bar yAxisId="left" dataKey="value" fill="#3b528b" name="Value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
                <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cumulativePercent"
                    name="Cumulative Percent"
                    stroke="#fde725"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};
