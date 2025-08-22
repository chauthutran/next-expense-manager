import { mergeTypeDefs } from "@graphql-tools/merge";
import { categoryTypeDefs } from "./categoryTypeDefs";
import { userTypeDefs } from "./userTypeDefs";
import { budgetTypeDefs } from "./budgetTypeDefs";
import { expenseTypeDefs } from "./ExpenseTypeDef";

export const typeDefs = mergeTypeDefs([userTypeDefs, categoryTypeDefs, budgetTypeDefs, expenseTypeDefs]);