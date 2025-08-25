import { IExpense, JSONObject } from '@/libs/definations';
import React from 'react';
import {
    Cell,
    ResponsiveContainer,
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
import { useCategory } from '@/contexts/CategoryContext';
import CategoryLegend from '../CategoryLegend';
import { format, parseISO } from 'date-fns';

export default function CustomLineChart({
    data,
    showLabels = true
}: {
    data: IExpense[];
    showLabels?: boolean;
}) {
    const transformData = (): JSONObject[] => {
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
            (a: JSONObject, b: JSONObject) =>
                a.time.getTime() - b.time.getTime()
        );
    };

    const transformedData = transformData();

    return (
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={transformedData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 25
                    }}
                >
                    <Line dataKey="value" activeDot={{ r: 8 }}>
                        {transformedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                            />
                        ))}
                    </Line>
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
                </LineChart>
            </ResponsiveContainer>
    );
}
