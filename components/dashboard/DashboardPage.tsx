'use client';

import { useAuth } from '@/contexts/AuthContext';
import ExpensesByCategory from './CategoryWiseExpenses';
import SummaryCard from './SumaryCard';
import MonthlyBarChart from './MonthlyBarChart';
import * as Constant from '@/libs/constants';
import { useEffect, useState } from 'react';
import { IExpense, IMessage, SearchFilters } from '@/libs/definations';
import { ExpenseService } from '@/services/expenseService';
import { createMessage } from '@/utils';
import { useCategory } from '@/contexts/CategoryContext';

const DEMO_YEAR = 2024;

export default function DashboardPage() {
    const { user } = useAuth();
    const { loading: categoryLoading, categoryMap } = useCategory();
    const [data, setData] = useState<IExpense[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<IMessage>(createMessage());

    const fetchExpenses = async () => {
        setLoading(true);

        const responseData = await ExpenseService.findExpenses({
            user: user?.id!,
            startDate: `${DEMO_YEAR}-01-01`,
            endDate: `${DEMO_YEAR}-12-31`
        } as SearchFilters);

        if (responseData.success) {
            setData(responseData.data);
        } else {
            setMessage({
                type: Constant.ALERT_TYPE_ERROR,
                msg: responseData.message!
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (user) {
            // Fetch data only when user is logged in
            fetchExpenses();
        }
    }, [user]);

    return (
        <>
            {loading || categoryLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                    <div className="text-xl font-semibold">Loading...</div>
                </div>
            ) : (
                <div className="bg-white">
                    {/* Header */}
                    <SummaryCard year={DEMO_YEAR} expenses={data} />

                    <div className="grid grid-cols-3 sm gap-6">
                        <MonthlyBarChart data={data} />

                        <div className="col-span-2">
                            <ExpensesByCategory expenses={data} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
