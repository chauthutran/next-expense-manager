import mongoose, { Schema } from 'mongoose';

const BudgetSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        totalLimit: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);

export default Budget;
