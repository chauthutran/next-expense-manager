import { IExpense, JSONObject } from '@/libs/definations';
import MonthlyExpenseTrend from './charts/MonthlyExpenseTrends';
import ChartTypes from './charts/ChartTypes';
import { useState } from 'react';

export default function ReportChart({ data }: { data: IExpense[] }) {
    const [selectedChartType, setSelectedChartType] = useState<JSONObject>({});
    console.log('===== data', data);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* ChartTypes */}
            <div className="lg:col-span-1 bg-white rounded-2xl p-4 h-full border-gray-200 border">
                    <ChartTypes
                        onItemClick={(type) => setSelectedChartType(type)}
                    />
            </div>

            {/* Chart Content */}
            {selectedChartType.id && (
                <div className="lg:col-span-4">
                    <div
                        className={`bg-white rounded-2xl shadow-md p-6 h-full items-start justify-between`}
                    >
                        {selectedChartType.id ===
                            'MONTHLY_SPENDING_OVERVIEW' && (
                            <MonthlyExpenseTrend
                                data={data}
                                config={selectedChartType}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
