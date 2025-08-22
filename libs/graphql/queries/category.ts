import { gql } from '@apollo/client';

export const GET_CATEGORY_BY_ID = gql`
    query {
		findCategoryById {
			id
            name
            description
            color
            icon
		}
    }
`;

export const GET_CATEGORIES = gql`
    query {
        findAll {
            id
            name
            description
            color
            icon
        }
    }
`;
export const CREATE_CATEGORY = gql`
    mutation CreateCategory(
        $name: String!
        $description: String
        $color: String!
        $icon: String!
    ) {
        createCategory(
            name: $name
            description: $description
            color: $color
            icon: $icon
        ) {
            id
            name
            description
            color
            icon
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory(
        $id: ID!
        $name: String!
        $description: String
        $color: String!
        $icon: String!
    ) {
        updateCategory(
            id: $id
            name: $name
            description: $description
            color: $color
            icon: $icon
        ) {
            id
            name
            description
            color
            icon
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($id: ID!) {
        deleteCategory (
            id: $id
        )
    }
`

