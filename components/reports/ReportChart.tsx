import { IBudget, IExpense, JSONObject } from '@/libs/definations';
import MonthlyExpenseTrend from './charts/MonthlyExpenseTrends';
import DataVisualizations from './charts/DataVisualizations';
import { useState } from 'react';
import CategoryWiseExpenses from './charts/CategoryWiseExpenses';
import CategoryLegend from './charts/CategoryLegend';
import ChartTypes from './charts/basic/ChartTypes';
import Budget from '@/app/pages/budget/page';
import BudgetVSExpense from './charts/BudgetVSExense';

export default function ReportChart({
    expenses,
    budgets,
    showLabels = true
}: {
    expenses: IExpense[];
    budgets: IBudget[];
    showLabels?: boolean;
}) {
    const [dataVisualization, setDataVisualization] = useState<JSONObject>({});
    const [selectedChartType, setSelectedChartType] = useState('');

    const handleOnSetDataVisualization = (dataVisualization: JSONObject) => {
        setDataVisualization(dataVisualization);
        setSelectedChartType(dataVisualization.types[0]);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left side menus - Data Visualizations */}
            <div className="lg:col-span-1 bg-white rounded-2xl p-4 h-full border-gray-200 border">
                <DataVisualizations
                    onItemClick={(_dataVisualization) =>
                        handleOnSetDataVisualization(_dataVisualization)
                    }
                />
            </div>

            {/* Right side - Chart Content */}
            {dataVisualization.types && (
                <div className="lg:col-span-4">
                    <div
                        className={`bg-white rounded-2xl border p-6 h-full items-start justify-between`}
                    >
                        {/* Title and Chart Types */}
                        <div
                            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
                            } gap-x-3 mb-4`}
                        >
                            <h2 className="text-lg font-semibold mb-4">
                                {dataVisualization.name}
                            </h2>
                            <div className="flex space-x-3 item-center justify-end">
                                <ChartTypes
                                    types={dataVisualization.types}
                                    selected={selectedChartType}
                                    onItemClick={(type) =>
                                        setSelectedChartType(type)
                                    }
                                />
                            </div>
                        </div>
                        
                        {/* Chart Area */}
                        <div
                            className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
                                showLabels ? '' : 'md:grid-cols-1'
                            }`}
                        >
                            <div
                                className={`${
                                    selectedChartType === 'heatmap'
                                        ? 'col-span-3' // single column
                                        : showLabels
                                        ? 'md:col-span-2' // default for other charts
                                        : 'md:col-span-1'
                                }`}
                            >
                                {dataVisualization.id ===
                                    'MONTHLY_SPENDING_OVERVIEW' && (
                                    <MonthlyExpenseTrend
                                        data={expenses}
                                        chartType={selectedChartType}
                                    />
                                )}

                                {dataVisualization.id ===
                                    'CATEGORY_WISE_EXPENSES' && (
                                    <CategoryWiseExpenses
                                        data={expenses}
                                        chartType={selectedChartType}
                                    />
                                )}

                                {dataVisualization.id ===
                                    'BUDGET_VS_ACTUAL_SPENDING' && (
                                    <BudgetVSExpense
                                        data={budgets}
                                        chartType={selectedChartType}
                                    />
                                )}
                            </div>

                            {/* Category List - Place in the second column */}
                            {showLabels && selectedChartType !== 'heatmap' && (
                                <div className="md:col-span-1">
                                    <CategoryLegend />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
