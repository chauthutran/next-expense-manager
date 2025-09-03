import React from 'react';
import { JSONObject } from '@/libs/definations';
import { useCategory } from '@/contexts/CategoryContext';
import { formatCurrency } from '@/libs/utils';

/**
 * Convert raw transactions to category x month data for heatmap
 */

export default function Heatmap({ data }: { data: JSONObject }) {
    const { categoryMap } = useCategory();
    const { months, categories, heatmapData } = data;

    // Find max value to scale colors
    const allValues = heatmapData.flatMap((row: JSONObject) =>
        months.map((month: string) => row[month] || 0)
    );
    const maxValue = Math.max(...allValues);

    return (
        <div className="overflow-x-auto col-span-3 space-y-4">
            {/* Color Legend */}
            <div className="flex gap-2 px-4 py-2 text-xs text-gray-600">
                <span>Low</span>
                <div className="flex h-3 w-32 rounded bg-gradient-to-r from-blue-100 to-blue-600"></div>
                <span>High</span>
            </div>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="border-collapse w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="text-left p-3 font-semibold text-gray-600">
                                Category
                            </th>
                            {months.map((month: string) => (
                                <th
                                    key={month}
                                    className="text-center p-3 font-semibold text-gray-600"
                                >
                                    {month}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {heatmapData.map((row: JSONObject, indx: number) => (
                            <tr
                                key={`row-${indx}`}
                                className="border-b border-gray-100 hover:bg-gray-50 transition"
                            >
                                {/* Category Column */}
                                <td className="p-3 font-medium text-gray-700 whitespace-nowrap">
                                    {row.category}
                                </td>

                                {/* Heatmap Cells */}
                                {months.map((month: string) => {
                                    const value = row[month] || 0;
                                    const intensity = value / maxValue; // 0 → 1
                                    const bgColor = `rgba(59, 130, 246, ${Math.min(
                                        intensity + 0.1,
                                        1
                                    )})`;

                                    // text color for contrast (white text if dark background)
                                    const textColor =
                                        intensity > 0.5
                                            ? 'text-white'
                                            : 'text-gray-800';

                                    return (
                                        <td
                                            key={month}
                                            className="p-1 text-center"
                                            title={`${row.category} - ${month}: $${value}`}
                                        >
                                            <div
                                                className={`whitespace-nowrap p-3 flex items-center justify-center rounded-md font-semibold ${textColor}`}
                                                style={{
                                                    backgroundColor: bgColor
                                                }}
                                            >
                                                {value > 0
                                                    ? formatCurrency(value)
                                                    : '-'}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
