import { Document, ObjectId, Schema } from "mongoose";
import * as Constant from '@/libs/constants';

export interface ResponseData {
    success: boolean;
    message?: string;
    data?: any;
}

export interface ActionType {
    type: string; 
    payload?: any;

}

export interface SearchFilters {
    user: string;
    categories?: string[];
    startDate?: string;
    endDate?: string;
}

export type JSONObject = { [key: string]: any };

export type IMessage = {type: string, msg: string};

export interface IUser extends Document {
    email: string;
    password: string;
}

export interface ICategory extends Document {
    id?: string;
    name: string;
    description: string;
    color: string;
    icon: string;
}


export interface IBudget {
    id?: string;
    name: string;
    user: string;         // string ID
    startDate: string;    // ISO string
    endDate: string;      // ISO string
    totalLimit: number;
    description?: string;
    category: string;     // string ID
    expenses: IExpense[];
    totalExpenses?: number;
}

export interface IExpense {
    id?: string;
    amount: number;
    date: string;
    description: string;
    user: string;
    category: string;
}