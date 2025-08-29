import { IBudget, IExpense, JSONObject } from '../definations';
import { addMonths, startOfMonth, endOfMonth } from 'date-fns';
import { convertDateStrToObj } from './dateUtils';

export const groupExpenseByCategories = (
    expenseList: IExpense[] | null,
    categoryMap: JSONObject | null
): JSONObject[] => {
    if (!expenseList || !categoryMap) {
        return [];
    }

    const groupedData = expenseList.reduce(
        (acc: JSONObject[], expense: IExpense) => {
            const { category: categoryId, amount } = expense;
            const category = categoryMap[categoryId];
            const existingCategory = acc.find(
                (item) => item.categoryId === category.id
            );
            if (existingCategory) {
                existingCategory.total += amount;
            } else {
                acc.push({
                    categoryId,
                    name: category.name,
                    total: amount,
                    color: category.color
                });
            }
            return acc;
        },
        []
    ) as JSONObject[];

    return groupedData.sort((a, b) => b.total - a.total);
};

export const transformTreeMapData = (expenses: IExpense[], categoryMap: JSONObject): JSONObject[] => {
    const groupedData = groupExpenseByCategories(expenses, categoryMap);

    return groupedData.map((item) => ({
        name: item.name,
        value: item.total,
        fill: item.color
    }));
};

export const transformCumulativeDataByMonth = (
    budgets: IBudget[]
): JSONObject[] => {
    // Convert start/end dates to Date objects
    const start = budgets.reduce(
        (minDate, b) =>
            convertDateStrToObj(b.startDate) < minDate
                ? convertDateStrToObj(b.startDate)
                : minDate,
        convertDateStrToObj(budgets[0].startDate)
    );

    const end = budgets.reduce(
        (maxDate, b) =>
            convertDateStrToObj(b.endDate) > maxDate
                ? convertDateStrToObj(b.endDate)
                : maxDate,
        convertDateStrToObj(budgets[0].endDate)
    );

    const timeline: JSONObject[] = [];
    let current = startOfMonth(start);
    while (current <= end) {
        const monthStart = startOfMonth(current);
        const monthEnd = endOfMonth(current);
        const monthStr = current.toLocaleString('en-US', {
            month: 'short',
            year: 'numeric'
        }); // e.g. "Jan 2024"

        let cumulativeBudget = 0;
        let cumulativeActual = 0;

        budgets.forEach((b) => {
            const bStart = new Date(b.startDate);
            const bEnd = new Date(b.endDate);
            // Effective period for this budget in this month
            const effectiveStart = bStart > monthStart ? bStart : monthStart;
            const effectiveEnd = bEnd < monthEnd ? bEnd : monthEnd;

            if (effectiveStart <= effectiveEnd) {
                const daysInMonthForBudget =
                    (effectiveEnd.getTime() - effectiveStart.getTime()) /
                        (1000 * 60 * 60 * 24) +
                    1;
                const totalBudgetDays =
                    (bEnd.getTime() - bStart.getTime()) /
                        (1000 * 60 * 60 * 24) +
                    1;
                cumulativeBudget +=
                    (b.totalLimit * daysInMonthForBudget) / totalBudgetDays;
            }

            // Sum expenses up to month end
            b.expenses.forEach((e) => {
                const expenseDate = new Date(e.date);
                if (expenseDate >= monthStart && expenseDate <= monthEnd)
                    cumulativeActual += e.amount;
            });
        });

        timeline.push({ month: monthStr, cumulativeBudget, cumulativeActual });
        current = addMonths(current, 1);
    }
    console.log('==== timeline', timeline);
    return timeline;
};
