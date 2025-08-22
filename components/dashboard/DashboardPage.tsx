'use client';

import { useAuth } from '@/contexts/AuthContext';
import ExpensesByCategory from './CategoryWiseExpenses';
import SummaryCard from './SumaryCard';
import MonthlyBarChart from './MonthlyBarChart';

const DEMO_YEAR = 2024;

export default function DashboardPage() {
    const { user } = useAuth();

    return (
            <div className="bg-white">
                {/* Header */}
                <SummaryCard year={DEMO_YEAR} expenses={[]} />

                <div className="grid grid-cols-3 sm gap-6">
                    <MonthlyBarChart year={DEMO_YEAR} />

                    <div className="col-span-2">
                        <ExpensesByCategory year={DEMO_YEAR} expenses={[]} />
                    </div>
                </div>
            </div>
    );
}
