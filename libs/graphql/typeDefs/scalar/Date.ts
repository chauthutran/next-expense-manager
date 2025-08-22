import { GraphQLScalarType, Kind } from "graphql";

export const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Custom scalar type for Date (ISO-8601 string)",
    serialize(value: any): string | null {
        // Convert server-side Date -> client
        return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value: any): Date | null {
        // Convert client input -> Date
        return typeof value === "string" ? new Date(value) : null;
    },
    parseLiteral(ast): Date | null {
        // Handle hardcode query values
        if(ast.kind === Kind.STRING) {
            return new Date(ast.value);
        }
        
        return null;
    },
});