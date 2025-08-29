// 2. Monthly Expense Trends (Line Chart)
// Purpose: Displays expenses over time, typically on a monthly basis.
// Use Case: Helps users track changes in their spending over time, identify trends, and plan future budgets.

import { useCategory } from '@/contexts/CategoryContext';
import { JSONObject } from '@/libs/definations';
import React from 'react';
import {
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Bar
} from 'recharts';
import { getCategoriesFromMap } from '@/libs/utils/categoryUtil';
import { capitalizeFirstLetter, formatCurrency } from '@/libs/utils';

export default function CustomBarChart({
    data,
    dataKeys
}: {
    data: JSONObject[];
    dataKeys: JSONObject[];
}) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 25
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    tickFormatter={(value: number) => formatCurrency(value)}
                    tick={{ fontSize: 12 }}
                />
                
                {dataKeys.map((keyValue, index) => (
                    <Bar dataKey={keyValue.name} key={keyValue.name}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color || keyValue.color}
                            />
                        ))}
                    </Bar>
                ))}

                <Tooltip
                    formatter={(value: number, name: string) => [
                        formatCurrency(value),
                        capitalizeFirstLetter(name)
                    ]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
