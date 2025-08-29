import { useState } from 'react';
import ReportDetails from './ReportDetails';
import ReportSummaryCards from './ReportSummaryCards';
import { IBudget, IExpense, IMessage, SearchFilters } from '@/libs/definations';
import { createMessage } from '@/libs/utils';
import { ExpenseService } from '@/services/expenseService';
import * as Constant from '@/libs/constants';
import SearchForm from '../layout/SearchForm';
import ReportChart from './ReportChart';
import { BudgetService } from '@/services/budgetService';

export default function ReportsPage() {
    const [message, setMessage] = useState<IMessage>(createMessage());
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [budgets, setBudgets] = useState<IBudget[]>([]);

    const fetchData = async (_filters: SearchFilters) => {
        setLoading(true);
        try {
            // Fetch in parallel
            const [expenseRes, budgetRes] = await Promise.all([
                ExpenseService.findExpenses(_filters),
                BudgetService.findBudgets(_filters)
            ]);

            if (expenseRes.success) {
                setExpenses(expenseRes.data);
            } else {
                setMessage({
                    type: Constant.ALERT_TYPE_ERROR,
                    msg: expenseRes.message!
                });
            }

            if (budgetRes.success) {
                setBudgets(budgetRes.data);
            } else {
                setMessage({
                    type: Constant.ALERT_TYPE_ERROR,
                    msg: budgetRes.message!
                });
            }
        } catch (error) {
            setMessage({
                type: Constant.ALERT_TYPE_ERROR,
                msg: 'Something went wrong while fetching data.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleOnSearch = async (filters: SearchFilters) => {
        setMessage(createMessage());

        await fetchData(filters);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Search Form */}
            <SearchForm onSearch={handleOnSearch} />

            {/* Summary Cards */}
            {expenses && budgets && (
                <>
                    <div className="">
                        <ReportSummaryCards expenses={expenses} budgets={budgets} />
                    </div>

                    {/* Charts Section */}
                    <div className="bg-white rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">Charts</h2>
                        <div>
                            <ReportChart expenses={expenses} budgets={budgets} />
                        </div>
                    </div>

                    {/* 📋 Detailed Table */}
                    <ReportDetails data={expenses} />
                </>
            )}
        </div>
    );
}
