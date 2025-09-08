import { useCategory } from '@/contexts/CategoryContext';
import { IBudget, IExpense } from '@/libs/definations';
import { formatCurrency } from '@/libs/utils';
import { groupExpenseByCategories } from '@/libs/utils/chartUtils';

/**Red card → overspending alerts.
Green card → under-budget notification.
Blue card → summary of top 3 spending categories.
 */
export default function ReportSummaryCards({
    expenses,
    budgets
}: {
    expenses: IExpense[];
    budgets: IBudget[];
}) {
    const { categoryMap } = useCategory();

    const groupedByCategories = groupExpenseByCategories(
        expenses,
        categoryMap
    ).slice(0, 3);

    const totalOverBudget = budgets.reduce((value: number, item: IBudget) => {
        const totalExpenses = item.totalExpenses ?? 0;
        if (totalExpenses > item.totalLimit) {
            value += totalExpenses - item.totalLimit;
        }

        return value;
    }, 0);

    const totalUnderBudget = budgets.reduce((sum, item) => {
        const totalExpenses = item.totalExpenses ?? 0;
        if (totalExpenses < item.totalLimit) {
            return sum + (item.totalLimit - totalExpenses);
        }
        return sum;
    }, 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="space-y-2">
                {/* Overspending alert */}
                <div className="bg-red-100 text-red-800 p-3 rounded-lg shadow-sm flex justify-between items-center">
                    <span>Over Budget</span>
                    <span className="font-bold">
                        {formatCurrency(totalOverBudget)}
                    </span>
                </div>

                {/* Under budget */}
                <div className="bg-green-100 text-green-800 p-3 rounded-lg shadow-sm flex justify-between items-center">
                    <span>Under Budget</span>
                    <span className="font-bold">
                        {formatCurrency(totalUnderBudget)}
                    </span>
                </div>
            </div>

            {/* Top categories */}
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-1">Top Categories</h4>
                <ul className="text-sm list-disc list-inside">
                    {groupedByCategories.map((item) => (
                        <li key={item.category}>
                            {item.name}:{' '}
                            <strong>{formatCurrency(item.total)}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
