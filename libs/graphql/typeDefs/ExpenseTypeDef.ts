import { gql } from "@apollo/client";

export const expenseTypeDefs = gql`
    scalar Date
    
    type Expense {
        id: ID!
        amount: Float!
        date: Date!
        description: String
        user: String!
        category: String!
    }
        
    type Query {
        findExpense(id: ID!): Expense
        findExpenses(user: ID!, startDate: Date, endDate: Date, categories: [ID!]): [Expense]
    }
        
    type Mutation {
        createExpense(
            amount: Float!
            date: Date!
            description: String
            user: String!
            category: String!
        ): Expense!
        
        
        updateExpense(
            id: ID!
            amount: Float!
            date: Date!
            description: String
            user: String!
            category: String!
        ): Expense!
        
        deleteExpense(id: ID!): Boolean!
    }
`