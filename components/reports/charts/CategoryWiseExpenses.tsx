// Expense Distribution by Category (Pie/Donut Chart)
// Purpose: Shows how a user’s expenses are distributed across different categories (e.g., food, rent, utilities, entertainment).
// Use Case: Helps users identify which categories consume the largest portion of their budget.

import { IExpense, JSONObject } from '@/libs/definations';
import React from 'react';
import { useCategory } from '@/contexts/CategoryContext';
import CustomPieChart from './basic/CustomPieChart';
import CustomStackBarChart from './basic/CustomStackBarChart';
import CustomBarChart from './basic/CustomBarChart';
import CustomDoughnutChart from './basic/CustomDoughnutChart';

const groupExpenseByCategories = (expenseList: IExpense[] | null, categoryMap: JSONObject | null) => {
    if( !expenseList || !categoryMap ) {
        return [];
    }
    
    return expenseList.reduce((acc: JSONObject[], expense: IExpense) => {
        const { category: categoryId, amount } = expense;
        const category = categoryMap[categoryId];
        const existingCategory = acc.find(item => item.categoryId === category.id);
        if (existingCategory) {
            existingCategory.total += amount;
        } else {
            acc.push({ categoryId, name: category.name, total: amount, color: category.color });
        }
        return acc;
    }, []) as JSONObject[];
}

export default function CategoryWiseExpenses({
    data,
    chartType
}: {
    data: IExpense[];
    chartType: string;
}) {
    const { categoryMap } = useCategory();

    return (
        <>
            {chartType === 'bar' && (
                <CustomBarChart
                    data={groupExpenseByCategories(data, categoryMap)}
                />
            )}

            {chartType === 'pie' && (
                <CustomPieChart
                    data={groupExpenseByCategories(data, categoryMap)}
                />
            )}

            {chartType === 'doughnut' && (
                <CustomDoughnutChart
                    data={groupExpenseByCategories(data, categoryMap)}
                />
            )}
        </>
    );
}
