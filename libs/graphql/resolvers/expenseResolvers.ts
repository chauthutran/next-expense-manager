import { convertDateStrToObj } from './../../utils/dateUtils';
import connectToDatabase from '@/libs/db';
import { IBudget, IExpense } from '@/libs/definations';
import Budget from '@/libs/schemas/Budget.schema';
import Expense from '@/libs/schemas/Expense.schema';
import { isValidDate, resolveDateRangeForSearch } from '@/libs/utils';
import DataLoader from 'dataloader';

export const expenseResolvers = {
    Query: {
        findExpense: async (
            _: any,
            { id }: { id: string }
        ): Promise<IExpense | null> => {
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
                startDate?: Date;
                endDate?: Date;
                categories?: string[];
            }
        ): Promise<IExpense[]> => {
            const { startDate: start, endDate: end } =
                resolveDateRangeForSearch(
                    startDate?.toISOString(),
                    endDate?.toISOString()
                );

            // Build dynamic query
            const query: any = { user };

            const dateFilter: any = {};
            if (start && isValidDate(start))
                dateFilter.$gte = convertDateStrToObj(start);
            if (end && isValidDate(end))
                dateFilter.$lte = convertDateStrToObj(end);
            if (Object.keys(dateFilter).length > 0) {
                query.date = dateFilter;
            }

            if (categories && categories.length > 0) {
                query.category = { $in: categories };
            }

            await connectToDatabase();
            return await Expense.find(query).sort({ date: 1 });
        }
    },
    Expense: {
        budgets: async (parent: IExpense) => await budgetLoader.load(parent)
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
            { id, ...updated }: { id: string; [key: string]: any }
        ): Promise<IExpense | null> => {
            await connectToDatabase();
            return await Expense.findByIdAndUpdate(id, updated);
        },
        deleteExpense: async (
            _: any,
            { id }: { id: string }
        ): Promise<boolean> => {
            await connectToDatabase();
            const deleted = await Expense.findByIdAndDelete(id);
            return !!deleted;
        }
    }
};

const budgetLoader = new DataLoader(async (expenses: readonly IExpense[]) => {
    const results = await Budget.find({
        $or: expenses.map((b) => ({
            user: b.user,
            category: b.category,
            startDate: { $lte: b.date },
            endDate: { $gte: b.date }
        }))
    });

    return expenses.map((expense) =>
        results.filter(
            (e) =>
                e.user.toString() === expense.user.toString() &&
                e.category.toString() === expense.category.toString() &&
                e.startDate <= expense.date &&
                e.endDate >= expense.date
        )
    );
});
