import { IBudget, ResponseData, SearchFilters } from '@/libs/definations';
import {
    CREATE_BUDGET,
    DELETE_BUDGET,
    FIND_BUDGET_BY_ID,
    FIND_BUDGETS,
    UPDATE_BUDGET
} from '@/libs/graphql/queries/budget';
import { sendGraphQLRequest } from './requestService';

export const BudgetService = {
    findBudgetId: async (id: string): Promise<ResponseData> => {
        return sendGraphQLRequest(FIND_BUDGET_BY_ID, { id }, 'findBudgetById');
    },
    findBudgets: async (filters: SearchFilters): Promise<ResponseData> => {
        return sendGraphQLRequest(FIND_BUDGETS, filters, 'findBudgets');
    },
    save: async (data: IBudget): Promise<ResponseData> => {
        // Create new budget
        if (!data.id || data.id === '') {
            return sendGraphQLRequest(CREATE_BUDGET, data, 'createBudget');
        }

        // Update existing budget
        return sendGraphQLRequest(UPDATE_BUDGET, data, 'updateBudget');
    },
    delete: async (id: string): Promise<ResponseData> => {
        return sendGraphQLRequest(DELETE_BUDGET, { id }, 'deleteBudget');
    },
    createEmptyBudget: (userId: string): IBudget => {
        return {
            name: '',
            user: userId,
            startDate: '',
            endDate: '',
            totalLimit: 0,
            description: '',
            category: ''
        } as IBudget;
    }
};
