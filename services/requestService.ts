import { ResponseData } from '@/libs/definations';
import { print } from 'graphql';

const GRAPHQL_API_BASE = `../api/graphql`;

export const sendGraphQLRequest = async (
    query: any,
    variables: Record<string, any> = {},
    dataWrapperName
): Promise<ResponseData> => {
    try {
        const response = await fetch(GRAPHQL_API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: print(query), // make sure 'query' is a proper gql AST
                variables // send only the variables object
            })
        });

        if (!response.ok) {
            const text = await response.text();
            return {
                success: false,
                message: `Network error: ${response.status} - ${text}`
            };
        }

        const result = await response.json();
        if (result.errors) {
            return { success: false, message: result.errors[0].message };
        }

        // check if result.data exists
        if (!result.data || !result.data[dataWrapperName]) {
            return {
                success: false,
                message: `No data returned for ${dataWrapperName}`
            };
        }

        return { success: true, data: result.data[dataWrapperName] };
    } catch (ex) {
        return { success: false, message: ex.message };
    }
};
