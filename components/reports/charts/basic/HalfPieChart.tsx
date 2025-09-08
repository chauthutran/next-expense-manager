// components/HalfPieProgressChart.tsx
'use client';

import { COLOR_EXPENSE } from '@/libs/constants';
import { formatCurrency } from '@/libs/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface HalfPieProgressChartProps {
    expense: number;
    budget: number;
}

const HalfPieProgressChart: React.FC<HalfPieProgressChartProps> = ({
    expense,
    budget
}) => {
    const percentage = Math.min(expense / budget, 1);

    // Base: full budget (background)
    const baseData = [{ value: 1 }];
    // Expense: overlay proportionally
    const expenseData = [{ value: percentage }];

    return (
        <div className="relative w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    {/* Background half circle */}
                    <Pie
                        data={baseData}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={80}
                        outerRadius={100}
                        dataKey="value"
                        stroke="none"
                    >
                        <Cell fill="#e0e0e0" />
                    </Pie>

                    {/* Overlay expense */}
                    <Pie
                        data={expenseData}
                        startAngle={180}
                        endAngle={180 - 180 * percentage} // fill proportionally
                        innerRadius={80}
                        outerRadius={100}
                        dataKey="value"
                        stroke="none"
                    >
                        <Cell fill="#3b82f6"/>
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Centered text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center -translate-y-4">
                <p className="text-sm  w-1/5">
                    <span className='text-black'>{formatCurrency(expense)}</span><span className='text-gray-500'> of {formatCurrency(budget)}</span>
                </p>
            </div>
        </div>
    );
};

export default HalfPieProgressChart;
