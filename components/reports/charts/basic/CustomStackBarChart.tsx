// 2. Monthly Expense Trends (Line Chart)
// Purpose: Displays expenses over time, typically on a monthly basis.
// Use Case: Helps users track changes in their spending over time, identify trends, and plan future budgets.

import { useCategory } from '@/contexts/CategoryContext';
import { JSONObject } from '@/libs/definations';
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { getCategoriesFromMap } from '@/utils/categoryUtil';

export default function CustomStackBarChart({ data }: { data: JSONObject[] }) {
    const { categoryMap } = useCategory();

    const categoryList = getCategoriesFromMap(categoryMap);
    console.log('================= BarChart data:', data);
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
                <YAxis />
                <Tooltip />

                {categoryList.map((category: JSONObject) => (
                    <Bar
                        key={category.name}
                        dataKey={category.name}
                        stackId="a"
                        fill={category.color}
                    ></Bar>
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}
