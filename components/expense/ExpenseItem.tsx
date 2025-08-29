'use client';

import { IBudget, IExpense, JSONObject } from '@/libs/definations';
import * as Utils from '@/libs/utils';
import { useCategory } from '@/contexts/CategoryContext';
import Button from '../basics/Button';

export default function ExpenseItem({
    data,
    itemOnShowEditForm,
    itemOnDelete
}: {
    data: IExpense;
    itemOnShowEditForm: (item: IExpense) => void;
    itemOnDelete: (item: IExpense) => void;
}) {
    const { categoryMap } = useCategory();

    const category = categoryMap[data.category];

    const dateStr = Utils.formatDisplayDateObj(
        Utils.convertDateStrToObj(data.date)
    );

    return (
        <div className="flex flex-col sm:flex-row sm:items-center p-4 border-b border-gray-100 rounded-lg shadow-sm hover:bg-gray-100 bg-white cursor-pointer gap-2 sm:gap-4">
            <div className="text-sm font-semibold text-gray-500 w-20">
                {dateStr}
            </div>

            <div className="flex flex-1 space-x-2 font-medium text-gray-500">
                <div
                    className="w-4 h-4"
                    dangerouslySetInnerHTML={{ __html: category.icon }}
                />
                <div>{data.description || category?.name}</div>
            </div>

            <div className="flex flex-1 space-x-2 font-medium">
                {data.budgets
                    .map(
                        (budget: IBudget) =>
                            `${Utils.formatCurrency(
                                budget.totalLimit
                            )} for budget ${budget.name}`
                    )
                    .join(', ')}
            </div>

            <div className="flex flex-1 text-gray-700 font-bold">
                {Utils.formatCurrency(data.amount)}
            </div>

            <div className="flex">
                <div className="flex space-x-2">
                    <Button
                        title="Edit"
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => itemOnShowEditForm(data)}
                    />
                    <Button
                        title="Delete"
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => itemOnDelete(data)}
                    />
                </div>
            </div>
        </div>
    );
}
