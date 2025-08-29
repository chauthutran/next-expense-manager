import { JSONObject } from '@/libs/definations';
import { useEffect, useState } from 'react';

const VISUALIZATIONS = [
    {
        id: 'MONTHLY_SPENDING_OVERVIEW',
        name: 'Monthly Overview',
        description: 'Total spending per month',
        viewOptions: [
            { type: 'bar', viewModes: ['total', 'category'] },
            { type: 'line' },
            { type: 'heatmap' }
        ]
    },
    {
        id: 'CATEGORY_WISE_EXPENSES',
        name: 'Category Wise Expenses',
        description: 'Proportion of spending per category',
        viewOptions: [{ type: 'bar' }, { type: 'treemap' }, { type: 'pareto'}, { type: 'doughnut' }]
    },
    {
        id: 'BUDGET_VS_ACTUAL',
        name: 'Budget vs Actual',
        description: 'Track if within budget',
        viewOptions: [
            { type: 'variance' },
            { type: 'bar' },
            { type: 'composed' }
        ]
    },
    {
        id: 'CUMULATIVE_EXPENSES',
        name: 'Cumulative Expenses',
        description: 'Savings growth/shrink',
        viewOptions: [{ type: 'bar' }, { type: 'line' }, { type: 'area' }]
    },
    {
        id: 'TOP_EXPENSES',
        name: 'Top Expenses',
        description: 'Largest expenses in a period',
        viewOptions: [{ type: 'bar'}]
    }
];

export default function DataVisualizations({
    onItemClick
}: {
    onItemClick: (type: JSONObject) => void;
}) {
    const [expandedId, setExpandedId] = useState<string | null>(
        VISUALIZATIONS[0].id
    );

    useEffect(() => {
        onItemClick(VISUALIZATIONS[0]);
    }, []);

    return (
        <div className="flex flex-col w-full space-y-2">
            {VISUALIZATIONS.map((visualization) => (
                <div
                    key={visualization.id}
                    className={`border rounded-md p-2 cursor-pointer hover:bg-gray-100 transition ${
                        expandedId === visualization.id && 'bg-gray-100'
                    }`}
                    onClick={() => {
                        setExpandedId(
                            expandedId === visualization.id
                                ? null
                                : visualization.id
                        );
                        onItemClick(visualization);
                    }}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">
                            {visualization.name}
                        </h3>
                    </div>

                    {expandedId === visualization.id && (
                        <p className="text-gray-500 text-xs mt-1">
                            {visualization.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
