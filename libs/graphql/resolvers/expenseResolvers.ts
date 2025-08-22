import connectToDatabase from '@/libs/db';
import { IExpense } from '@/libs/definations';
import Expense from '@/libs/schemas/Expense.schema';

export const expenseResolvers = {
    Query: {
        findExpense: async (_: any, { id }): Promise<IExpense | null> => {
            await connectToDatabase();
            return await Expense.findById(id);
        },
        findExpenses: async (
            _: any,
            {
                user,
                startDate,
                endDate,
                categories
            }: {
                user: string;
                startDate?: string;
                endDate?: string;
                categories?: string[];
            }
        ): Promise<IExpense[]> => {
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            // Build dynamic query
            const query: any = { user };
            
            const dateFilter: any = {};
            if (start && !isNaN(start.getTime())) dateFilter.$gte = start;
            if (end && !isNaN(end.getTime())) dateFilter.$lte = end;
            if (Object.keys(dateFilter).length > 0) {
                query.date = dateFilter;
            }

            if (categories && categories.length > 0) {
                query.category = { $in: categories };
            }
            
            await connectToDatabase();
            return await Expense.find(query);
        }
    },
    Mutation: {
        createExpense: async (
            _: any,
            args: IExpense
        ): Promise<IExpense | null> => {
            await connectToDatabase();
            const expense = new Expense(args);
            return await expense.save();
        },
        updateExpense: async (
            _: any,
            { id, ...updated }
        ): Promise<IExpense | null> => {
            await connectToDatabase();
            return await Expense.findByIdAndUpdate(id, updated);
        },
        deleteExpense: async (_: any, { id }): Promise<boolean> => {
            await connectToDatabase();
            const deleted = await Expense.findByIdAndDelete(id);
            return !!deleted;
        }
    }
};
