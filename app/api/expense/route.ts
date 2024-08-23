
import connectToDatabase from "@/lib/db";
import { JSONObject } from "@/lib/definations";
import Expense from "@/lib/schemas/Expense.schema";
import * as Utils from "@/lib/utils";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }) {
	const url = new URL(request.url);
	const searchValues = Utils.convertUrlSearchParamToJson(url.searchParams);

	const userId = searchValues.userId;
	const categoryType = searchValues.categoryType;

	await connectToDatabase();
	const expenseList = await Expense.aggregate([
		{
			$lookup: {
				from: 'categories', // Name of the Category collection
				localField: 'categoryId',
				foreignField: '_id',
				as: 'categoryInfo',
			},
		},
		{
			$unwind: '$categoryInfo',
		},
		{
			$match: {
				userId: new mongoose.Types.ObjectId(userId),
				'categoryInfo.type': categoryType
			},
		},
		{
			$project: {
				_id: 1,
				description: 1,
				categoryId: '$categoryInfo._id',
				categoryName: '$categoryInfo.name',
				budgetId: '$budgetId',
				amount: 1,
				date: 1,
				// categoryType: '$categoryInfo.type', // Project the category type
			},
		},
	]);

	return NextResponse.json(expenseList, { status: 200 });
}


export async function POST(request: NextRequest) {
	const payload: JSONObject = await request.json();

	payload.userId = new mongoose.Types.ObjectId(payload.userId as string);
	payload.categoryId = new mongoose.Types.ObjectId(payload.categoryId as string);

	if (payload.budgetId !== undefined) {
		payload.budgetId = new mongoose.Types.ObjectId(payload.budgetId as string);
	}

	await connectToDatabase();
	let newTransaction = await Expense.create(payload);

	return NextResponse.json(newTransaction, { status: 200 })
}

export async function PUT(request: NextRequest, { params }) {

	const payload: JSONObject = await request.json();

	// Destructure budgetId out of the updateData, if exists
	const { budgetId, ...updateFields } = payload;
	
    updateFields.date = Utils.formatDateObjToDbDate(Utils.convertDateStrToObj(payload.date));

	// Create the update object
	let updateObject = {
		$set: updateFields,
		// $currentDate: { updatedAt: true }, // Update the `updatedAt` timestamp
	};

	// Conditionally add $unset to remove budgetId if needed
	if ( budgetId == undefined ) {
		updateObject["$unset"] = { budgetId: "" };
	}

	// Find the transaction by ID and update it with the provided fields
	
	await connectToDatabase();
	const updatedTransaction = await Expense.findByIdAndUpdate(
		payload._id,
		updateObject,
		{ new: true, runValidators: true }
	);
	return NextResponse.json(updatedTransaction, { status: 200 })

}

export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id");

	await connectToDatabase();
	await Expense.findByIdAndDelete(id);
	return NextResponse.json({ message: "Transaction is deleted." }, { status: 200 });
}