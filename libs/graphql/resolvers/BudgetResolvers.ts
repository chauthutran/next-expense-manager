import connectToDatabase from '@/libs/db';
import { dateScalar } from '../typeDefs/scalar/Date';
import Budget from '@/libs/schemas/Budget.schema';
import { IBudget, IDbBudget } from '@/libs/definations';
import Expense from '@/libs/schemas/Expense.schema';
import DataLoader from 'dataloader';
import { isValidDate, resolveDateRangeForSearch } from '@/libs/utils';

export const budgetResolvers = {
    Date: dateScalar,
    Query: {
        findBudgetById: async (_: any, { id }: { id: string }) => {
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
                startDate?: Date;
                endDate?: Date;
                categories?: string[];
            }
        ) => {
            const dateRange = resolveDateRangeForSearch(
                startDate?.toISOString(),
                endDate?.toISOString()
            );

            // Build dynamic query
            const query: any = { user };
            if (dateRange.startDate && isValidDate(dateRange.startDate)) {
                query.startDate = { $gte: dateRange.startDate };
            }
            if (dateRange.endDate && isValidDate(dateRange.endDate)) {
                query.endDate = { $lte: dateRange.endDate };
            }
            if (categories && categories.length > 0) {
                query.category = { $in: categories };
            }

            await connectToDatabase();
            return await Budget.find(query).sort({ startDate: 1 });
        }
    },
    Budget: {
        expenses: async (parent: IDbBudget) => await expenseLoader.load(parent),
        totalExpenses: async (parent: IDbBudget) => {
            const expenses = await expenseLoader.load(parent);
            return expenses.reduce((sum, e) => sum + e.amount, 0);
        }
    },
    Mutation: {
        createBudget: async (_: unknown, args: IBudget) => {
            await connectToDatabase();
            const budget = new Budget(args);
            return await budget.save();
        },
        updateBudget: async (
            _: unknown,
            { id, ...updates }: { id: string; [key: string]: any }
        ) => {
            await connectToDatabase();
            return await Budget.findByIdAndUpdate(id, updates, { new: true });
        },
        deleteBudget: async (_: unknown, { id }: { id: string }) => {
            await connectToDatabase();
            const deleted = await Budget.findByIdAndDelete(id);
            return !!deleted; // true if deleted, false if not found
        }
    }
};

const expenseLoader = new DataLoader<IDbBudget, any[]>(
    async (budgets: readonly IDbBudget[]) => {
        const results = await Expense.find({
            $or: budgets.map((b) => {
                const dateRange = resolveDateRangeForSearch(
                    b.startDate.toISOString(),
                    b.endDate.toISOString()
                );
                return {
                    user: b.user,
                    category: b.category,
                    date: { $gte: dateRange.startDate, $lte: dateRange.endDate }
                };
            })
        }).sort({ date: 1 });

        return budgets.map((budget) =>
            results.filter(
                (e) =>
                    e.user.toString() === budget.user.toString() &&
                    e.category.toString() === budget.category.toString() &&
                    e.date >= budget.startDate &&
                    e.date <= budget.endDate
            )
        );
    }
);
