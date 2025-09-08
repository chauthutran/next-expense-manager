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
import useData from '@/hooks/useData';

export default function ReportsPage() {
    const [filterData, setFilterData] = useState<SearchFilters | null>(null);
    
    const { loading, message, expenses, budgets } = useData({
        filterData
    });

    const handleOnSearch = (filters: SearchFilters) => {
        setFilterData(filters);
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
