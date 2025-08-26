// Expense Distribution by Category (Pie/Donut Chart)
// Purpose: Shows how a user’s expenses are distributed across different categories (e.g., food, rent, utilities, entertainment).
// Use Case: Helps users identify which categories consume the largest portion of their budget.

import { JSONObject } from '@/libs/definations';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function CustomPieChart({
    data,
}: {
    data: JSONObject[];
}) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    nameKey="name"
                    dataKey="total"
                    cx="50%"
                    cy="50%"
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
