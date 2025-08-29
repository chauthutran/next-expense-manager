import { IExpense, JSONObject } from '@/libs/definations';
import * as Utils from '@/libs/utils';
import UserSummary from './summary/UserSummary';
import HighestCategory from './summary/HighestCategory';
import ExpenseDistribution from './summary/ExpenseDistribution';

export default function SummaryCard({ year, expenses }: { year: number, expenses: IExpense[]  }) {
    
    const filterExpenseListByYear = Utils.filterExpenseListByYear(year, expenses);

    // { total: xxx, groupByCategory: { <categoryId1 : yyy, ... }}
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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <UserSummary year={year} expenseByYear={expenseByYear} />
            
            <HighestCategory year={year} expenseByYear={expenseByYear} />
            
            <ExpenseDistribution year={year} dataList={filterExpenseListByYear} />
        </div>
    );
}
