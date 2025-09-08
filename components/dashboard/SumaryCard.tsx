import { IBudget, IExpense, JSONObject } from '@/libs/definations';
import * as Utils from '@/libs/utils';
import UserSummary from './summary/UserSummary';
import ExpenseDistribution from './summary/ExpenseDistribution';
import HalfPieChart from '../reports/charts/basic/HalfPieChart';

export default function SummaryCard({
    year,
    expenses,
    budgets
}: {
    year: number;
    expenses: IExpense[];
    budgets: IBudget[];
}) {
    const filterExpenseListByYear = Utils.filterExpenseListByYear(
        year,
        expenses
    );

    const expenseByYear = filterExpenseListByYear.reduce(
        (acc: JSONObject, curItem: IExpense) => {
            const { category: categoryId, amount } = curItem;
            acc.total += amount;

            acc.groupByCategory[categoryId] ??= 0;
            acc.groupByCategory[categoryId] += curItem.amount;
            return acc;
        },
        { total: 0, groupByCategory: {} as JSONObject[] }
    );

    const summaryTotals = budgets.reduce(
        (totals, item: IBudget) => {
            totals.totalBudget += item.totalLimit;
            totals.totalExpense += item.totalExpenses || 0;
            return totals;
        },
        { totalBudget: 0, totalExpense: 0 }
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="flex col-span-1 lg:col-span-2">
                <UserSummary year={year} expenseByYear={expenseByYear} />
            </div>

            <div className="flex flex-col bg-slate-100 rounded-xl px-4 pb-2">
                <div className="font-bold px-2 pt-3">Budget Vs Expense</div>
                <div className="italic text-sm text-gray-500 px-2">
                    In year {year}
                </div>

                <div className="mt-auto justify-between items-center">
                    <HalfPieChart
                        expense={summaryTotals.totalExpense}
                        budget={summaryTotals.totalBudget}
                    />
                </div>
            </div>
            
            <ExpenseDistribution
                year={year}
                dataList={filterExpenseListByYear}
            />
        </div>
    );
}
