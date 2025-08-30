import { gql } from '@apollo/client';

export const LOGIN = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword(
        $id: ID!
        $oldPassword: String!
        $newPassword: String!
    ) {
        changePassword(
            id: $id
            oldPassword: $oldPassword
            newPassword: $newPassword
        ) {
            id
            email
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $password: String!) {
        createUser(email: $email, password: $password) {
            id
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`;

export const REQUEST_TO_RESET_PASSWORD = gql`
    mutation RequestToResetPassword($email: String!) {
        requestToResetPassword(email: $email)
    }
`;
