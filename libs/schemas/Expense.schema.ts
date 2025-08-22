"use server";

import mongoose, {  Schema } from "mongoose";

const ExpenseSchema = new Schema ( 
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        amount: { type: Number, required: true },
        description: { type: String, required: false },
        date: { type: Date, required: true },
        
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    {
        timestamps: true,
    }
)
const Expense = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

export default Expense;