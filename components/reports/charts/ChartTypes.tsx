import { JSONObject } from '@/libs/definations';
import { useEffect, useState } from 'react';

const CHART_TYPES = [
    { id: 'MONTHLY_SPENDING_OVERVIEW', name: 'Monthly Overview', description: 'Total spending per month', type: ['bar', 'line', 'heatmap'] },
    { id: 'CATEGORY_WISE_EXPENSES', name: 'Category Expenses', description: 'Proportion of spending per category', type: ['bar', 'pie', 'doughnut'] },
    { id: 'BUDGET_VS_ACTUAL_SPENDING', name: 'Budget vs Actual', description: 'Track if within budget', type: ['bar', 'bullet'] },
    { id: 'EXPENSE_TRENDS', name: 'Expense Trends', description: 'Track category or total trends', type: ['line', 'area'] },
    { id: 'TOP_EXPENSES', name: 'Top Expenses', description: 'Largest expenses in a period', type: ['bar', 'table'] },
    { id: 'CUMULATIVE_EXPENSES', name: 'Cumulative Expenses', description: 'Savings growth/shrink', type: ['line', 'area'] },
    { id: 'HIGHLIGHTS', name: 'Highlights', description: 'Overspending alerts', type: ['cards'] }
];

export default function ChartTypes({ onItemClick }: { onItemClick: (type: JSONObject) => void }) {
    const [expandedId, setExpandedId] = useState<string | null>(CHART_TYPES[0].id);
    
    useEffect(() => {
        onItemClick(CHART_TYPES[0]);
    }, []);
    
    return (
        <div className="flex flex-col w-56 space-y-2">
            {CHART_TYPES.map((type) => (
                <div
                    key={type.id}
                    className={`border rounded-md p-2 cursor-pointer hover:bg-gray-100 transition ${expandedId === type.id && "bg-gray-100"}`}
                    onClick={() => {
                        setExpandedId(expandedId === type.id ? null : type.id);
                        onItemClick(type);
                    }}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">{type.name}</h3>
                    </div>
                    
                    {expandedId === type.id && (
                        <p className="text-gray-500 text-xs mt-1">{type.description}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
