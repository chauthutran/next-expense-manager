import { IExpense } from '@/libs/definations';
import * as Utils from '@/libs/utils';

export default function LatestExpenses({
    data,
    year,
    topN = 6
}: {
    data: IExpense[];
    year: number;
    topN?: number;
}) {
    const topNList = data.slice(0, topN);

    return (
        <div className="flex flex-col px-4 space-y-2">
            <div className="font-bold px-2 pt-3">Details {year}</div>

            {/* List */}
            <div className="space-y-2 bg-slate-100 rounded-xl p-3">
                {topNList.map((expense: IExpense) => (
                    <div
                        key={`exp_${expense.id}`}
                        className="flex flex-col sm:flex-row sm:items-center p-2 border-b border-gray-300  hover:bg-white cursor-pointer gap-5"
                    >
                        <div className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                            {Utils.formatDisplayDate(expense.date)}
                        </div>

                        <div className="flex flex-1 text-gray-700 font-bold">
                            {expense.description}
                        </div>

                        <div className="flex flex-1 text-gray-700 font-bold">
                            {Utils.formatCurrency(expense.amount)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
