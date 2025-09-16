import { gql } from '@apollo/client';

export const FIND_EXPENSE_BY_ID = gql`
    query findExpense($id: ID!) {
        findExpense(id: $id) {
            id
            category
            user
            amount
            description
            date
            budgets {
                id
                name
                totalLimit
            }
        }
    }
`;

export const FIND_EXPENSES = gql`
    query FindExpenses(
        $user: ID!
        $startDate: Date
        $endDate: Date
        $categories: [ID!]
    ) {
        findExpenses(
            user: $user
            startDate: $startDate
            endDate: $endDate
            categories: $categories
        ) {
            id
            category
            user
            amount
            description
            date
            budgets {
                id
                name
                totalLimit
            }
        }
    }
`;

export const CREATE_EXPENSE = gql`
    mutation CreateExpense(
        $user: String!
        $category: String!
        $amount: Float!
        $description: String!
        $date: Date!
    ) {
        createExpense(
            user: $user
            category: $category
            amount: $amount
            description: $description
            date: $date
        ) {
            id
            category
            user
            amount
            description
            date
        }
    }
`;

export const UPDATE_EXPENSE = gql`
    mutation UpdateExpense(
        $id: ID!
        $user: String!
        $category: String!
        $amount: Float!
        $description: String!
        $date: Date!
    ) {
        updateExpense(
            id: $id
            user: $user
            category: $category
            amount: $amount
            description: $description
            date: $date
        ) {
            id
            category
            user
            amount
            description
            date
        }
    }
`;

export const DELETE_EXPENSE = gql`
    mutation DeleteExpense($id: ID!) {
        deleteExpense(id: $id)
    }
`;
