// 2. Monthly Expense Trends (Line Chart)
// Purpose: Displays expenses over time, typically on a monthly basis.
// Use Case: Helps users track changes in their spending over time, identify trends, and plan future budgets.

import { useCategory } from '@/contexts/CategoryContext';
import { IExpense, JSONObject } from '@/libs/definations';
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    ResponsiveContainer,
    LabelList
} from 'recharts';
import * as Utils from '@/utils';
import CategoryLegend from './CategoryLegend';
import { format, parseISO } from 'date-fns';
import { getCategoriesFromMap } from '@/utils/categoryUtil';
import CustomBarChart from './basic/CustomBarChart';
import CustomLineChart from './basic/CustomLineChart';
import Heatmap from './basic/Heapmap';

// Custom render function for labels
const renderCustomLabel = (props) => {
    const { x, y, width, value } = props;
    return (
        <text
            x={x + width / 2}
            y={y - 10}
            fill="#f44566" // Set your desired color
            textAnchor="middle"
            dominantBaseline="bottom"
            fontSize="12px" // Set your desired font size
            fontWeight="bold" // Set font weight
        >
            {value}
        </text>
    );
};

export default function MonthlyExpenseTrend({
    data,
    config,
    showLabels = true
}: {
    data: IExpense[];
    showLabels?: boolean;
    config: JSONObject;
}) {
    const [chartType, setChartType] = React.useState<
        'bar' | 'line' | 'heatmap'
    >('bar');

    return (
        <div>
            <div
                className={`grid grid-cols-1 ${
                    showLabels && 'md:grid-cols-2 lg:grid-cols-2'
                } gap-x-3 mb-4`}
            >
                <h2 className="text-lg font-semibold mb-4">{config.name}</h2>
                <div className="flex space-x-3 item-center justify-end">
                    <div
                        className={`cursor-pointer rounded-lg border py-2 px-3 ${
                            chartType === 'bar' && 'bg-blue-200'
                        }`}
                        onClick={() => setChartType('bar')}
                    >
                        Bar
                    </div>
                    <div
                        className={`cursor-pointer rounded-lg border py-2 px-3 ${
                            chartType === 'line' && 'bg-blue-200'
                        }`}
                        onClick={() => setChartType('line')}
                    >
                        Line
                    </div>
                    <div
                        className={`cursor-pointer rounded-lg border py-2 px-3 ${
                            chartType === 'heatmap' && 'bg-blue-200'
                        }`}
                        onClick={() => setChartType('heatmap')}
                    >
                        Heatmap
                    </div>
                </div>
            </div>

            <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
                    showLabels ? '' : 'md:grid-cols-1'
                }`}
            >
                <div
                    className={`${
                        chartType === 'heatmap'
                            ? 'col-span-3' // single column
                            : showLabels
                            ? 'md:col-span-2' // default for other charts
                            : 'md:col-span-1'
                    }`}
                >
                    {chartType === 'bar' && <CustomBarChart data={data} />}
                    {chartType === 'line' && <CustomLineChart data={data} />}
                    {chartType === 'heatmap' && <Heatmap data={data} />}
                </div>

                {/* Category List - Place in the second column */}
                {showLabels && chartType !== 'heatmap' && (
                    <div className="md:col-span-1">
                        <CategoryLegend />
                    </div>
                )}
            </div>
        </div>
    );
}
