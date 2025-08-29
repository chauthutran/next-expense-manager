// 2. Monthly Expense Trends (Line Chart)
// Purpose: Displays expenses over time, typically on a monthly basis.
// Use Case: Helps users track changes in their spending over time, identify trends, and plan future budgets.

import { useCategory } from '@/contexts/CategoryContext';
import { IExpense, IViewChartOption, JSONObject } from '@/libs/definations';
import React from 'react';
import { format, parseISO } from 'date-fns';
import { getCategoriesFromMap } from '@/libs/utils/categoryUtil';
import CustomStackBarChart from '../basic/CustomStackBarChart';
import CustomBarChart from '../basic/CustomBarChart';
import CustomLineChart from '../basic/CustomLineChart';
import Heatmap from '../basic/Heapmap';

const transformBarChartData = (
    data: IExpense[],
    categoryMap: JSONObject
): JSONObject[] => {
    const grouped: Record<string, any> = {};

    data.forEach((exp) => {
        const date = new Date(exp.date);
        const category = categoryMap[exp.category];
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g. "2024-1"
        const timeLabel = date.toLocaleString('en-US', {
            month: 'short',
            year: 'numeric'
        }); // e.g. "Jan 2024"

        if (!grouped[monthKey]) {
            grouped[monthKey] = { total: 0, name: timeLabel };
        }

        // Add category amount
        grouped[monthKey][category.name] =
            (grouped[monthKey][category.name] || 0) + exp.amount;

        // Add to total
        grouped[monthKey].total += exp.amount;
    });

    return Object.values(grouped);
};

const transformLineChartData = (data: IExpense[]): JSONObject[] => {
    const result: Record<string, JSONObject> = {};

    data.forEach((item) => {
        const date = new Date(item.date);
        const monthYearStr = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, '0')}-01T00:00:00.000Z`;

        const monthYearObj = parseISO(monthYearStr);
        const monthYearName = format(date, 'MMM yyyy');

        if (!result[monthYearStr]) {
            result[monthYearStr] = {
                time: monthYearObj, // keep actual date for sorting
                name: monthYearName,
                value: 0
            };
        }

        // accumulate totals
        result[monthYearStr].value += item.amount;
    });

    // Convert object → array
    const list = Object.values(result);

    // Sort by actual date
    return list.sort(
        (a: JSONObject, b: JSONObject) => a.time.getTime() - b.time.getTime()
    );
};

const transformHeatmapData = (data: IExpense[], categoryMap: JSONObject) => {
    const result: Record<string, JSONObject> = {}; // monthYearStr -> category -> amount
    const monthSet = new Set<string>();
    const categorySet = new Set<string>();

    data.forEach((tx) => {
        const date = parseISO(tx.date);
        const monthName = format(date, 'MMM yyyy'); // e.g. "Jan 2024"
        monthSet.add(monthName);

        const category = categoryMap[tx.category]?.name || tx.category;
        categorySet.add(category);

        if (!result[monthName]) result[monthName] = {};
        if (!result[monthName][category]) result[monthName][category] = 0;

        result[monthName][category] += tx.amount;
    });

    const months = Array.from(monthSet).sort(
        (a, b) => new Date(`1 ${a}`).getTime() - new Date(`1 ${b}`).getTime()
    );

    const categories = Array.from(categorySet);

    // Convert to heatmapData: category rows with month columns
    const heatmapData: JSONObject[] = categories.map((cat) => {
        const row: JSONObject = { category: cat };
        months.forEach((month) => {
            row[month] = result[month]?.[cat] || 0;
        });
        return row;
    });

    return { months, categories, heatmapData };
};

export default function MonthlyExpenseTrend({
    data,
    viewOptions
}: {
    data: IExpense[];
    viewOptions: IViewChartOption;
}) {
    const { categoryMap } = useCategory();
  
    if (!viewOptions || !data) return null;

    return (
        <>
            {viewOptions.type === 'bar' && viewOptions.viewMode === 'total' && (
                <CustomStackBarChart
                    data={transformBarChartData(data, categoryMap)}
                />
            )}
            {viewOptions.type === 'bar' &&
                viewOptions.viewMode === 'category' && (
                    <CustomBarChart
                        data={transformBarChartData(data, categoryMap)}
                        dataKeys={getCategoriesFromMap(categoryMap)}
                    />
                )}

            {viewOptions.type === 'line' && (
                <CustomLineChart data={transformLineChartData(data)} />
            )}

            {viewOptions.type === 'heatmap' && (
                <Heatmap data={transformHeatmapData(data, categoryMap)} />
            )}
        </>
    );
}
