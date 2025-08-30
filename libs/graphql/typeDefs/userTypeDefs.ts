import { gql } from '@apollo/client';

export const userTypeDefs = gql`
    type User {
        id: ID!
        email: String!
    }

    type Query {
        login(email: String!, password: String!): User
    }

    type Mutation {
        createUser(email: String!, password: String!): User!
        changePassword(
            id: ID!
            oldPassword: String!
            newPassword: String!
        ): User!
        requestToResetPassword(
            email: String!
        ): Boolean
        deleteUser(id: ID!): Boolean!
    }
`;
