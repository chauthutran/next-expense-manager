import React from 'react';
import { IExpense, JSONObject } from '@/libs/definations';
import { format, parseISO } from 'date-fns';
import { useCategory } from '@/contexts/CategoryContext';
import { formatCurrency } from '@/utils';

/**
 * Convert raw transactions to category x month data for heatmap
 */
const transformForHeatmap = (data: IExpense[], categoryMap: JSONObject) => {
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
export default function Heatmap({ data }: { data: IExpense[] }) {
    const { categoryMap } = useCategory();
    const { months, categories, heatmapData } = transformForHeatmap(
        data,
        categoryMap
    );

    // Find max value to scale colors
    const allValues = heatmapData.flatMap((row) =>
        months.map((month) => row[month] || 0)
    );
    const maxValue = Math.max(...allValues);

    return (
        <div className="overflow-x-auto col-span-3">
            <table>
                <thead>
                    <tr className='border-b border-gray-200'>
                        <th className="text-left p-3">Category</th>
                        {months.map((month) => (
                            <th
                                key={month}
                                className="text-center p-3 text-sm font-semibold"
                            >
                                {month}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {heatmapData.map((row, indx) => (
                        <tr key={`row-${indx}`}>
                            <td className='p-3'>{row.category}</td>
                            {months.map((month) => {
                                const value = row[month] || 0;
                                const intensity = value / maxValue; // scale 0-1
                                const bgColor = `rgba(59, 130, 246, ${intensity})`; // blue gradient
                                return (
                                    <td
                                        key={month}
                                        className="p-3 border-b border-gray-200"
                                        style={{ backgroundColor: bgColor }}
                                        title={`${row.category} - ${month}: $${value}`}
                                    >
                                        {formatCurrency(value)}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Color Legend */}
            <div className="flex mt-4 items-center gap-2">
                <span className="h-4 w-4 bg-blue-100 rounded-sm"></span> Low
                <span className="h-4 w-4 bg-blue-500 rounded-sm ml-4"></span>{' '}
                Medium
                <span className="h-4 w-4 bg-blue-900 rounded-sm ml-4"></span>{' '}
                High
            </div>
        </div>
    );
}
