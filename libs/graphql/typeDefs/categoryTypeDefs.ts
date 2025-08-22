import { gql } from "@apollo/client";

export const categoryTypeDefs = gql`
    type Category {
        id: ID!
        name: String!
        description: String!
        color: String!
        icon: String!
        createdAt: String!
        updatedAt: String!
    }
        
    type Query {
        findAll: [Category!]!
        findCategoryById(id: ID!): Category
    }
        
    type Mutation {
        createCategory(name: String!, description: String!, color: String!, icon: String!): Category!
        updateCategory(id: ID!, name: String!, description: String!, color: String!, icon: String!): Category!
        deleteCategory(id: ID!): Boolean!
    }
`;