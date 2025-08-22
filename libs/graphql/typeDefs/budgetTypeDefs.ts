import { gql } from '@apollo/client';

export const budgetTypeDefs = gql`
    scalar Date

    type Budget {
        id: ID!
        name: String!
        user: String!
        startDate: Date!
        endDate: Date!
        totalLimit: Float!
        description: String
        category: String!
        expenses: [Expense!]!       # reference the existing Expense type
        totalExpenses: Float!       # computed field
    }

    type Query {
        findBudgetById(id: ID!): Budget
        findBudgets(user: ID!, startDate: Date, endDate: Date, categories: [ID!]): [Budget]
    }

    type Mutation {
        createBudget(
            name: String!
            user: String!
            startDate: Date!
            endDate: Date!
            totalLimit: Float!
            description: String
            category: String!
        ): Budget!
        
        updateBudget(
            id: ID!
            name: String!
            user: String!
            startDate: Date!
            endDate: Date!
            totalLimit: Float!
            description: String
            category: String!
        ): Budget!
        
        deleteBudget(id: ID!): Boolean!
    }
`;
