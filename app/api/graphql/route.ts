import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '@/libs/graphql/typeDefs';
import { resolvers } from '@/libs/graphql/resolvers';
import { NextRequest } from 'next/server';

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// 2. Create a handler with NextRequest context
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

// 3. Export GET and POST methods for Next.js
export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}