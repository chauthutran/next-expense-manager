import connectToDatabase from '@/libs/db';
import { dateScalar } from '../typeDefs/scalar/Date';
import Budget from '@/libs/schemas/Budget.schema';
import { IBudget } from '@/libs/definations';
import Expense from '@/libs/schemas/Expense.schema';
import DataLoader from 'dataloader';

export const budgetResolvers = {
    Date: dateScalar,
    Query: {
        findBudgetById: async (_: any, { id }) => {
            await connectToDatabase();
            return await Budget.findById(id);
        },
        findBudgets: async (
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
        ) => {
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            // Build dynamic query
            const query: any = { user };
            if (start && !isNaN(start.getTime())) {
                query.startDate = { $gte: start };
            }
            if (end && !isNaN(end.getTime())) {
                query.endDate = { $lte: end };
            }
            if (categories && categories.length > 0) {
                query.category = { $in: categories };
            }
            
            await connectToDatabase();
            return await Budget.find(query);
        }
    },
    Budget: {
        expenses: async (parent: IBudget) => await expenseLoader.load(parent),
        totalExpenses: async (parent: IBudget) => {
            const expenses = await expenseLoader.load(parent);
            return expenses.reduce((sum, e) => sum + e.amount, 0);
        }
    },
    Mutation: {
        createBudget: async (_, args) => {
            await connectToDatabase();
            const budget = new Budget(args);
            return await budget.save();
        },
        updateBudget: async (_, { id, ...updates }) => {
            await connectToDatabase();
            return await Budget.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteBudget: async (_, { id }) => {
            await connectToDatabase();
            const deleted = await Budget.findByIdAndDelete(id);
            return !!deleted; // true if deleted, false if not found
        }
    }
};

const expenseLoader = new DataLoader(async (budgets: IBudget[]) => {
    const results = await Expense.find({
        $or: budgets.map(b => ({
            user: b.user,
            category: b.category,
            date: { $gte: b.startDate, $lte: b.endDate }
        }))
    });

    return budgets.map(budget => 
        results.filter(e => 
            e.user.toString() === budget.user.toString() &&
            e.category.toString() === budget.category.toString() &&
            e.date >= budget.startDate && e.date <= budget.endDate
        )
    );
});
