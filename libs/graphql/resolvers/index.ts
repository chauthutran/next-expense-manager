import { expenseResolvers } from './expenseResolvers';
import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./userResolvers";
import { categoryResolvers } from "./categoryResolvers";
import { budgetResolvers } from "./BudgetResolvers";

export const resolvers = mergeResolvers([userResolvers, categoryResolvers, budgetResolvers, expenseResolvers]);
