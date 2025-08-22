import connectToDatabase from "../../db"
import Category from "../../schemas/Category.schema";

export const categoryResolvers = {
    Query: {
        findAll: async () => {
            await connectToDatabase();
            
            return await Category.find().sort({ createdAt: -1});
        },
        findCategoryById: async (_: any, {id}: { id: string}) => {
            await connectToDatabase();
            
            return await Category.findById(id);
        }
    },
    Mutation: {
        createCategory: async (_:any, {name, description, color, icon}: any) => {
            await connectToDatabase();
            const category = new Category({ name, description, color, icon });
            return await category.save();
        },
        updateCategory: async(_:any, { id, name, description, color, icon}: any) => {
            await connectToDatabase();
            const category = await Category.findByIdAndUpdate(
                id,
                { name, description, color, icon },
                { new: true }
            );
            
            return category;
        },
        deleteCategory: async(_: any, {id}: { id: string}) => {
            await connectToDatabase();
            const deleted = await Category.findByIdAndDelete(id);
            return !!deleted; // true if deleted, false if not found
        },
    },
    // Explicit Category field resolvers (optional but good for clarity)
    Category: {
        id: (parent: any) => parent._id.toString(),
        name: (parent: any) => parent.name,
        description: (parent: any) => parent.description,
        color: (parent: any) => parent.color,
        icon: (parent: any) => parent.icon,
    },
};