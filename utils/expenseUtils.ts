import { ICategory, IExpense, JSONObject } from "@/libs/definations";
import { findItemFromList } from "./arrUtils";
import { getYearFromDateStr } from "./dateUtils";

export const sortArrayByDate  = (list: IExpense[]): IExpense[] => {
    return list.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
};

export const groupExpenseByCategories = (expenseList: IExpense[] | null, categoryMap: JSONObject | null) => {
    if( !expenseList || !categoryMap ) {
        return [];
    }
    
    return expenseList.reduce((acc: JSONObject[], expense: IExpense) => {
            const { category: categoryId, amount } = expense;
            const category = categoryMap[categoryId];
            const existingCategory = acc.find(item => item.categoryName === category.name);
            if (existingCategory) {
                existingCategory.total += amount;
            } else {
                acc.push({ categoryName: category.name, total: amount, color: category.color, icon: category.icon });
            }
            return acc;
        }, []) as JSONObject[];
}

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