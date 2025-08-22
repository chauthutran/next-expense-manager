"use server";

import mongoose, {  Schema } from "mongoose";
import { ICategory } from "../definations";

const CategorySchema = new mongoose.Schema<ICategory>({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: false
    },
    color: {
      type: String,
      require: false
    },
    icon: {
      type: String,
      require: false
    }
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;