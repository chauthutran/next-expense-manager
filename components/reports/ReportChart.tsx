import {
    IBudget,
    IExpense,
    IViewChartOption,
    JSONObject
} from '@/libs/definations';
import DataVisualizations from './charts/basic/DataVisualizations';
import { useState } from 'react';
import ChartViewOptionsForm from './charts/basic/ViewChartOptionsForm';
import BudgetVSExpense from './charts/features/BudgetVSExense';
import ChartLegend from './charts/basic/ChartLegend';
import CumulativeExpenses from './charts/features/CumulativeExpenses';
import MonthlyExpenseTrend from './charts/features/MonthlyExpenseTrends';
import CategoryWiseExpenses from './charts/features/CategoryWiseExpenses';
import { TopExpenses } from './charts/features/TopExpenses';

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
    const [selectedViewOptions, setSelectedViewOptions] =
        useState<IViewChartOption>({} as IViewChartOption);

    const handleOnSetDataVisualization = (dataVisualization: JSONObject) => {
        setDataVisualization(dataVisualization);
        setSelectedViewOptions({
            type: dataVisualization.viewOptions[0].type,
            viewMode: dataVisualization.viewOptions[0].viewModes?.[0] ?? ''
        });
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
            {dataVisualization.viewOptions && (
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
                                <ChartViewOptionsForm
                                    config={dataVisualization}
                                    selected={selectedViewOptions}
                                    onItemClick={(options) =>
                                        setSelectedViewOptions(options)
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
                                    selectedViewOptions.type === 'heatmap'
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
                                        viewOptions={selectedViewOptions}
                                    />
                                )}

                                {dataVisualization.id ===
                                    'CATEGORY_WISE_EXPENSES' && (
                                    <CategoryWiseExpenses
                                        data={expenses}
                                        viewOptions={selectedViewOptions}
                                    />
                                )}

                                {dataVisualization.id ===
                                    'BUDGET_VS_ACTUAL' && (
                                    <BudgetVSExpense
                                        data={budgets}
                                        viewOptions={selectedViewOptions}
                                    />
                                )}

                                {dataVisualization.id ===
                                    'CUMULATIVE_EXPENSES' && (
                                    <CumulativeExpenses
                                        data={budgets} 
                                        viewOptions={selectedViewOptions}
                                    />
                                )}

                                {dataVisualization.id ===
                                    'TOP_EXPENSES' && (
                                    <TopExpenses
                                        data={expenses} 
                                        viewOptions={selectedViewOptions}
                                    />
                                )}
                            </div>

                            {/* Category List - Place in the second column */}
                            {showLabels && (
                                <ChartLegend
                                    dataVisualization={dataVisualization}
                                    viewOptions={selectedViewOptions}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
