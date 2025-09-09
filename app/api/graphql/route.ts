import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '@/libs/graphql/typeDefs';
import { resolvers } from '@/libs/graphql/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server);

export async function OPTIONS(req: NextRequest) {
    // Preflight request
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}

export async function POST(req: NextRequest) {
    // Apply CORS headers manually
    const response = await handler(req);
    return new Response(response.body, {
        headers: {
            ...Object.fromEntries(response.headers),
            'Access-Control-Allow-Origin': '*'
        },
        status: response.status
    });
}

export async function GET(req: NextRequest) {
    const response = await handler(req);
    return new Response(response.body, {
        headers: {
            ...Object.fromEntries(response.headers),
            'Access-Control-Allow-Origin': '*'
        },
        status: response.status
    });
}
