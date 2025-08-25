// Expense Distribution by Category (Pie/Donut Chart)
// Purpose: Shows how a user’s expenses are distributed across different categories (e.g., food, rent, utilities, entertainment).
// Use Case: Helps users identify which categories consume the largest portion of their budget.

'use client';

import { IExpense, JSONObject } from '@/libs/definations';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useCategory } from '@/contexts/CategoryContext';
import * as Utils from '@/utils';
import { groupExpenseByCategories } from '@/utils/expenseUtils';
import CategoryLegend from '../CategoryLegend';

export default function CustomPieChart({
    data,
    showLabels = true,
    width = 400,
    heigh = 400
}: {
    data: IExpense[];
    showLabels?: boolean;
    width?: number;
    heigh?: number;
}) {
    const { categoryMap } = useCategory();

    const transformedData = groupExpenseByCategories(data, categoryMap);

    return (
        <div
            className={`grid grid-cols-1 ${
                showLabels && 'md:grid-cols-2 lg:grid-cols-2'
            } gap-x-3 mb-4`}
        >
            <ResponsiveContainer width={width} height={heigh}>
                <PieChart>
                    <Pie
                        data={transformedData}
                        nameKey="categoryName"
                        dataKey="total"
                        cx="50%"
                        cy="50%"
                        label={showLabels}
                    >
                        {transformedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            {/* Category List - Place in the second column */}
            {showLabels && (
                <div className="flex flex-col items-start justify-between">
                    <CategoryLegend />
                </div>
            )}
        </div>
    );
}
