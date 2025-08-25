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

export default function CustomBarChart({
    data,
    showLabels = true
}: {
    data: JSONObject[];
    showLabels?: boolean;
}) {
    const { categoryMap } = useCategory();

    const categoryList = getCategoriesFromMap(categoryMap);

    const transformData = (): JSONObject[] => {
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
            (a: JSONObject, b: JSONObject) =>
                a.time.getTime() - b.time.getTime()
        );
    };

    const transformedData = transformData();
    
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={transformedData}
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

                {categoryList
                    // .filter((cat) =>
                    //     transformedData.some((d) => d[cat.name] > 0)
                    // )
                    .map((category: JSONObject) => (
                        <Bar
                            key={category.name}
                            dataKey={category.name}
                            stackId="a"
                            fill={category.color}
                        >
                        </Bar>
                    ))}
            </BarChart>
        </ResponsiveContainer>
    );
}
