import { IExpense } from "./definations";

let data : IExpense | null = null;
export const setSelected = (obj: IExpense | null) => {
    data = obj;
}

export const getSelected = (): IExpense | null => {
    return data;
}