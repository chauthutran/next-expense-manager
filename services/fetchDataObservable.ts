import { IBudget, IExpense, IMessage, SearchFilters } from '@/libs/definations';
import { catchError, from, map, of } from 'rxjs';
import { ExpenseService } from './expenseService';
import { BudgetService } from './budgetService';
import * as Constant from '@/libs/constants';

export default function fetchDataObservable(filterData: SearchFilters) {
    return from(
        Promise.all([
            ExpenseService.findExpenses(filterData),
            BudgetService.findBudgets(filterData)
        ])
    ).pipe(
        map(([expenseRes, budgetRes]) => {
            const messages: IMessage[] = [];

            if (!expenseRes.success)
                messages.push({
                    type: Constant.ALERT_TYPE_ERROR,
                    msg: expenseRes.message!
                });
            if (!budgetRes.success)
                messages.push({
                    type: Constant.ALERT_TYPE_ERROR,
                    msg: budgetRes.message!
                });

            return {
                expenses: expenseRes.success ? expenseRes.data : [],
                budgets: budgetRes.success ? budgetRes.data : [],
                messages
            };
        }),

        catchError((err) =>
            of({
                expenses: [] as IExpense[],
                budgets: [] as IBudget[],
                messages: [
                    { type: Constant.ALERT_TYPE_ERROR, msg: err.message }
                ]
            })
        )
    );
}
