import { gql } from '@apollo/client';

export const FIND_BUDGET_BY_ID = gql`
    query FindBudgetById($id: ID!) {
        findBudgetById(id: $id) {
            id
            name
            user
            startDate
            endDate
            description
            category
            totalLimit
            expenses {
                id
                amount
                description
                date
            }
        }
    }
`;

export const FIND_BUDGETS = gql`
    query FindBudgets($user: ID!, $startDate: Date, $endDate: Date, $categories: [ID!]!) {
        findBudgets(user: $user, startDate: $startDate, endDate: $endDate, categories: $categories) {
            id
            name
            user
            startDate
            endDate
            description
            category
            totalLimit
            expenses {
                id
                amount
                description
                date
            }
            totalExpenses
        }
    }
`

export const CREATE_BUDGET = gql`
    mutation CreateBudget(
        $name: String!
        $user: String!
        $startDate: Date!
        $endDate: Date!
        $totalLimit: Float!
        $description: String
        $category: String!
    ) {
        createBudget(
            name: $name
            user: $user
            startDate: $startDate
            endDate: $endDate
            totalLimit: $totalLimit
            description: $description
            category: $category
        ) {
            id
            name
            user
            startDate
            endDate
            description
            category
            totalLimit
        }
    }
`;

export const UPDATE_BUDGET = gql`
    mutation UpdateBudget(
        $id: ID!
        $name: String!
        $user: String!
        $startDate: Date!
        $endDate: Date!
        $totalLimit: Float!
        $description: String
        $category: String!
    ) {
        updateBudget (
            id: $id
            name: $name
            user: $user
            startDate: $startDate
            endDate: $endDate
            totalLimit: $totalLimit
            description: $description
            category: $category
        ) {
            id
            name
            user
            startDate
            endDate
            description
            category
            totalLimit
        }
    }
`

export const DELETE_BUDGET = gql`
    mutation DeleteBudget($id: ID!) {
        deleteBudget (
            id: $id
        )
    }
`
