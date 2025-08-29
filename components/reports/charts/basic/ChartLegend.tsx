import { IViewChartOption, JSONObject } from '@/libs/definations';
import * as Constant from '@/libs/constants';
import CategoryLegend from './CategoryLegend';

export default function ChartLegend({ dataVisualization, viewOptions }: { dataVisualization: JSONObject, viewOptions: IViewChartOption }) {
    const cumulativeList = [
        { name: 'Budget', color: Constant.COLOR_BUDGET },
        { name: 'Expense', color: Constant.COLOR_EXPENSE }
    ];
    
    return (
        <>
            {dataVisualization.id === 'CUMULATIVE_EXPENSES' ? (
                <div className="md:col-span-1">
                    <div className="flex flex-col items-start justify-center h-full w-full">
                        {cumulativeList.map((item, idx) => (
                            <div
                                key={`cum_${idx}`}
                                className="flex items-center text-sm space-y-1"
                            >
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="px-3 whitespace-nowrap">
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                viewOptions.type !== 'heatmap' && (
                    <div className="md:col-span-1">
                        <CategoryLegend />
                    </div>
                )
            )}
        </>
    );
}
