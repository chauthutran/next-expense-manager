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
        <div className="rounded-xl bg-slate-100 flex flex-1 col-span-2">
            <div className="flex flex-col">
                <div className="font-bold px-2 pt-3">Expense Distribution</div>
                <div className="italic text-sm text-gray-500 px-2">
                    In year {year}
                </div>
                <CategoryWiseExpenses
                    data={dataList}
                    viewOptions={{type: "bar"}}
                />
            </div>
            <div className="grid-cols-2 gap-1 text-xs space-y-1 justify-between mt-4">
                <CategoryLegend />
            </div>
        </div>
    );
}
