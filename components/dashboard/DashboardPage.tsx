'use client';

import { useAuth } from '@/contexts/AuthContext';
import SummaryCard from './SumaryCard';
import { useCategory } from '@/contexts/CategoryContext';
import useData from '@/hooks/useData';
import { useMemo } from 'react';
import CategoryWiseExpenses from './CategoryWiseExpenses';
import ReportDetails from '../reports/ReportDetails';
import LatestExpenses from './LatestExpenses';

const DEMO_YEAR = 2024;

export default function DashboardPage() {
    const { user } = useAuth();

    const _filters = useMemo(
        () => ({
            user: user?.id!,
            startDate: `${DEMO_YEAR}-01-01`,
            endDate: `${DEMO_YEAR}-12-31`
        }),
        [user]
    );

    const { loading: categoryLoading, categoryMap } = useCategory();
    const { loading, message, expenses, budgets } = useData({
        filterData: _filters
    });

    return (
        <>
            {loading || categoryLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                    <div className="text-xl font-semibold">Loading...</div>
                </div>
            ) : (
                <div className="bg-white">
                    {/* Header */}
                    <SummaryCard
                        year={DEMO_YEAR}
                        expenses={expenses}
                        budgets={budgets}
                    />

                    <div className="grid grid-cols-3 sm gap-2 pt-3">
                        <div className="col-span-2">
                            <CategoryWiseExpenses
                                year={DEMO_YEAR}
                                budgets={budgets}
                            />
                        </div>
                        
                        <div>
                            <LatestExpenses 
                                year={DEMO_YEAR}
                                data={expenses} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
