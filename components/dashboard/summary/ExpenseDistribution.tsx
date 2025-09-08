import CategoryLegend from '@/components/reports/charts/basic/CategoryLegend';
import CategoryWiseExpenses from '@/components/reports/charts/features/CategoryWiseExpenses';
import { IExpense } from '@/libs/definations';

export default function ExpenseDistribution({
    year,
    dataList
}: {
    year: number;
    dataList: IExpense[];
}) {
    return (
        <div className="flex flex-col rounded-xl bg-slate-100 px-4 pb-2">
            {/* Header */}
            <div className="flex flex-col">
                <div className="font-bold px-2 pt-3">Expense Distribution</div>
                <div className="italic text-sm text-gray-500 px-2">
                    In year {year}
                </div>
            </div>

            {/* Chart */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full min-w-[300px] h-full min-h-[300px] p-4">
                    <CategoryWiseExpenses
                        data={dataList}
                        viewOptions={{ type: 'doughnut' }}
                    />
                </div>
            </div>
        </div>
    );
}
