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
}: {
    data: JSONObject[];
}) {
    return (
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 25
                    }}
                >
                    <Line dataKey="value" activeDot={{ r: 8 }}>
                        {data.map((entry, index) => (
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
