import { useState } from 'react';
import ReportDetails from './ReportDetails';
import ReportSummaryCards from './ReportSummaryCards';
import { IExpense, IMessage, SearchFilters } from '@/libs/definations';
import { createMessage } from '@/utils';
import { ExpenseService } from '@/services/expenseService';
import * as Constant from '@/libs/constants';
import SearchForm from '../layout/SearchForm';
import ReportChart from './ReportChart';

export default function ReportsPage() {
    const [filters, setFilters] = useState<SearchFilters | null>(null); // keep last filters
    const [message, setMessage] = useState<IMessage>(createMessage());
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IExpense[] | null>(null);

    const fetchExpenses = async (_filters: SearchFilters) => {
        setLoading(true);

        const responseData = await ExpenseService.findExpenses(_filters);
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

    const handleOnSearch = async (filters: SearchFilters) => {
        setMessage(createMessage());
        setFilters(filters);

        await fetchExpenses(filters);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Search Form */}
            <SearchForm onSearch={handleOnSearch} />

            {/* Summary Cards */}
            {data && (
                <>
                    <div className="">
                        <ReportSummaryCards data={data} />
                    </div>

                    {/* Charts Section */}
                    <div className="bg-white shadow rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">
                                Charts
                            </h2>
                        <div>
                            <ReportChart data={data} />
                        </div>
                    </div>

                    {/* 📋 Detailed Table */}
                    <ReportDetails data={data} />
                </>
            )}
        </div>
    );
}
