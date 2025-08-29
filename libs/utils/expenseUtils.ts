import { ICategory, IExpense, JSONObject } from "@/libs/definations";
import { findItemFromList } from "./arrUtils";
import { getYearFromDateStr } from "./dateUtils";

export const sortArrayByDate  = (list: IExpense[]): IExpense[] => {
    return list.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
};

export const filterExpenseListByYear = (year: number, expenseList: IExpense[] | null) => (expenseList ?? []).reduce(
    (acc, curItem: IExpense) => {
        const { date } = curItem;
        const expenseYear = getYearFromDateStr(date);
        if (expenseYear === year) {
            acc.push(curItem);
        }

        return acc;
    },
    [] as IExpense[]
);