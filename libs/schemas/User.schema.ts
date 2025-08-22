"use server";

import mongoose, { Schema } from "mongoose";
import { IUser } from "../definations";


const UserSchema = new Schema<IUser>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	},
	{
		timestamps: true,
	}
)
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;