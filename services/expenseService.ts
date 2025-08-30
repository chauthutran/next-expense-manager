import { IExpense, ResponseData, SearchFilters } from "@/libs/definations";
import { sendGraphQLRequest } from "./requestService";
import { CREATE_EXPENSE, DELETE_EXPENSE, FIND_EXPENSE_BY_ID, FIND_EXPENSES, UPDATE_EXPENSE } from "@/libs/graphql/queries/expense";
import { UPDATE_BUDGET } from "@/libs/graphql/queries/budget";

export const ExpenseService = {
    findExpenseById: async (id: string): Promise<ResponseData> => {
        return sendGraphQLRequest(FIND_EXPENSE_BY_ID, { id }, "findExpenseById");
    },
    findExpenses: async (filters: SearchFilters): Promise<ResponseData> => {
        return sendGraphQLRequest(FIND_EXPENSES, filters, "findExpenses");
    },
    save: async (data: IExpense): Promise<ResponseData> => {
        // Create a new Expense
        if(!data.id || data.id === "") {
            return sendGraphQLRequest(CREATE_EXPENSE, data, "createExpense");
        }
        
        // Update exising budget
        return sendGraphQLRequest(UPDATE_EXPENSE, data, "updateExpense");
    },
    delete: async(id: string): Promise<ResponseData> => {
        return sendGraphQLRequest(DELETE_EXPENSE, { id }, "deleteExpense");
    },
    createEmptyExpense: (userId: string): IExpense => {
        return {
            user: userId,
            amount: 0,
            date: "",
            description: "",
            category: "",
            budgets: [],
        }
    }
}