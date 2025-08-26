// 2. Monthly Expense Trends (Line Chart)
// Purpose: Displays expenses over time, typically on a monthly basis.
// Use Case: Helps users track changes in their spending over time, identify trends, and plan future budgets.

import { useCategory } from '@/contexts/CategoryContext';
import { IExpense, JSONObject } from '@/libs/definations';
import React from 'react';
import { format, parseISO } from 'date-fns';
import CustomStackBarChart from './basic/CustomStackBarChart';
import CustomLineChart from './basic/CustomLineChart';
import Heatmap from './basic/Heapmap';
import { getCategoriesFromMap } from '@/utils/categoryUtil';

const transformBarChartData = (
    data: IExpense[],
    categoryMap: JSONObject
): JSONObject[] => {
    const result = {};

    data.forEach((item) => {
        const date = new Date(item.date);
        const category = categoryMap[item.category];
        const monthYearStr = `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, '0')}-01T00:00:00.Z`; // Extract month-year
        const monthYearObj = parseISO(monthYearStr);
        const monthYearName = format(date, 'MMM yyyy');

        // If the month-year doesn't exist in the result, initialize it
        if (!result[monthYearStr]) {
            result[monthYearStr] = {
                monthYearStr,
                time: monthYearObj,
                name: monthYearName
            };
        }

        // Accumulate totals by categoryId
        if (result[monthYearStr][category.name]) {
            result[monthYearStr][category.name] += item.amount;
        } else {
            result[monthYearStr][category.name] = item.amount;
        }
    });

    // Compute the total value for each bar
    const categoryList = getCategoriesFromMap(categoryMap);
    const list = Object.values(result).map((entry: JSONObject) => {
        return {
            ...entry,
            total: categoryList!.reduce(
                (sum, category) => sum + (entry[category.name] || 0),
                0
            )
        };
    });

    return list.sort(
        (a: JSONObject, b: JSONObject) => a.time.getTime() - b.time.getTime()
    );
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
    chartType
}: {
    data: IExpense[];
    chartType: string;
}) {
    const { categoryMap } = useCategory();

    return ( 
        <>
            {chartType === 'bar' && (
                <CustomStackBarChart
                    data={transformBarChartData(data, categoryMap)}
                />
            )}

            {chartType === 'line' && (
                <CustomLineChart data={transformLineChartData(data)} />
            )}

            {chartType === 'heatmap' && (
                <Heatmap data={transformHeatmapData(data, categoryMap)} />
            )}
        </>
    );
}
