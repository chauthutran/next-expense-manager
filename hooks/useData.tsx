import { useAuth } from '@/contexts/AuthContext';
import { IBudget, IExpense, IMessage, SearchFilters } from '@/libs/definations';
import { routerSubject } from '@/libs/routerSubject';
import { BudgetService } from '@/services/budgetService';
import { ExpenseService } from '@/services/expenseService';
import { useEffect, useMemo, useState } from 'react';
import { debounceTime, filter, startWith, switchMap, tap } from 'rxjs';
import * as Constant from '@/libs/constants';
import fetchDataObservable from '@/services/fetchDataObservable';

interface UseDashboardDataProps {
    filterData: SearchFilters | null;
    onData?: (expenses: IExpense[], budgets: IBudget[]) => void;
}

export default function useData(
    { filterData, onData }: UseDashboardDataProps = {} as UseDashboardDataProps
) {
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [budgets, setBudgets] = useState<IBudget[]>([]);
    const [message, setMessage] = useState<IMessage | null>(null);

    const stableFilters = useMemo(() => {
        return filterData ? { ...filterData } : null;
    }, [filterData]);

    useEffect(() => {
        if (!stableFilters) return;

        // Router-driven updates
        const sub = routerSubject
            .pipe(
                filter(
                    (path) =>
                        path === '/pages/dashboard' || path === '/pages/report'
                ),
                debounceTime(300), // Wait 300ms after last event
                startWith('INIT'), // trigger initial fetch immediately
                tap(() => setLoading(true)), // Show loader before fetching
                // If the user quickly changes routes or filters, switchMap cancels the previous fetch and starts a new on
                switchMap(() => fetchDataObservable(stableFilters))
            )
            .subscribe(
                ({
                    expenses,
                    budgets,
                    messages
                }: {
                    expenses: IExpense[];
                    budgets: IBudget[];
                    messages: IMessage[];
                }) => {
                    setExpenses(expenses);
                    setBudgets(budgets);
                    setMessage(messages.length ? messages[0] : null);
                    setLoading(false);

                    onData?.(expenses, budgets);
                }
            );

        // // Trigger initial fetch immediately
        // setLoading(true);
        // const initSub = fetchDataObservable(stableFilters).subscribe(
        //     ({ expenses, budgets, messages }) => {
        //         setExpenses(expenses);
        //         setBudgets(budgets);
        //         setMessage(messages.length ? messages[0] : null);
        //         setLoading(false);

        //         if (onData) onData(expenses, budgets);
        //     }
        // );

        // Cleanup only if subscription exists
        return () => {
            sub.unsubscribe();
            // initSub.unsubscribe();
        };
    }, [stableFilters, onData]);

    return { loading, message, expenses, budgets };
}
