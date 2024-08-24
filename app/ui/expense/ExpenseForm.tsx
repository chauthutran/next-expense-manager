/** Form component for setting or updating the user's expense */

"use client";
import { JSONObject } from '@/lib/definations';
import React, { useEffect, useState } from 'react';
import * as Utils from "@/lib/utils";
import DateField from '../basics/DateField';
import Alert from '../basics/Alert';
import * as Constant from '@/lib/constants';
import { useExpense } from '@/contexts/ExpenseContext';
import { useMainUi } from '@/contexts/MainUiContext';
import { useCategory } from '@/contexts/CategoryContext';
import { IoTriangle } from "react-icons/io5";


export default function ExpenseForm({ data = {} as JSONObject }) {

	const { setSubPage } = useMainUi();
	const { categoryList } = useCategory();
	const { userId, processingStatus, setProcessingStatus, error, saveExpense, newExpense } = useExpense();

	const [expense, setExpense] = useState(data);
	const [continueCreateNew, setContinueCreateNew] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		if( processingStatus === Constant.SAVE_EXPENSE_SUCCESS ) {
			if( continueCreateNew) {
				handleOnReset();
			}
			else {
				setProcessingStatus("");
				setSubPage( null );
			}
		}
	}, [processingStatus]);

	const setValue = (propName: string, value: string | Date | null) => {
		setErrMsg("");
		var tempData = Utils.cloneJSONObject(expense);
		if (value == null || value == "") {
			delete tempData[propName];
		}
		else if (value instanceof Date) {
			tempData[propName] = Utils.formatDateObjToDbDate(value);
		}
		else {
			tempData[propName] = value;
		}

		setExpense(tempData);
	}

	const handleOnSave = (event: React.MouseEvent<HTMLButtonElement>, isContinue: boolean) => {
		event.preventDefault();
		if( checkValidation() ) {
			expense.userId = userId;
			setContinueCreateNew(isContinue);

			saveExpense(expense);
		}
		else {
			console.log(errMsg);
			setErrMsg("Please check red fields.")
		}
	};

	const checkValidation = () => {
		return (expense.categoryId === undefined 
			|| expense.amount === undefined
			|| expense.date === undefined
		) ? false: true;
	}

	const handleOnReset = () => {
		setExpense(Utils.cloneJSONObject(data));
	}

	const setTitle = () => {
		return (expense._id != undefined) ? "Edit expense" : "Add a new Expense";
	}

	return (
		<div className="overflow-x-auto bg-background-color">
			<h2 className="text-2xl font-semibold text-center flex flex-row space-x-4 justify-center items-end m-5">
				Add New Expense
			</h2>

			{processingStatus == Constant.SAVE_EXPENSE_SUCCESS && <Alert type={Constant.ALERT_TYPE_INFO} message={`Saved successfully.`} />}
			{processingStatus == Constant.SAVE_EXPENSE_FAILURE && <Alert type={Constant.ALERT_TYPE_ERROR} message={`Saving data is failed. ${error}`} />}
			{error == Constant.SAVE_EXPENSE_FAILURE && <Alert type={Constant.ALERT_TYPE_ERROR} message={`Saving data is failed. ${error}`} />}
			{errMsg !== "" && <Alert type={Constant.ALERT_TYPE_ERROR} message={`${errMsg}`} />}


			<div className="flex items-center justify-center ">
				<div className="flex-1 p-6 rounded border-2 shadow-md max-w-xl bg-white ">
					<div>
						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="amount">
								Amount <span className="text-red-600 ml-1">*</span>
							</label>
							<input
								type="number"
								id="amount"
								value={expense.amount}
								onChange={(e) => setValue("amount", e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
								required
							/>
							{(expense.amount == undefined || expense.amount == "" ) && <><br /><span className="text-sm italic text-red-600 ml-1">This field is required</span></>}
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="category">
								Category <span className="text-red-600 ml-1">*</span>
							</label>
							<select
								id="categoryId"
								onChange={(e) => setValue("categoryId", e.target.value)}
								value={expense.categoryId}
								className="w-full p-2 border border-gray-300 rounded"
							>
								<option value="">[Please select]</option>
								{categoryList && categoryList?.map((category: JSONObject) => (
									<option key={category._id} value={category._id}>{category.name}</option>
								))}
							</select>
							{(expense.categoryId == undefined || expense.categoryId == "" ) && <><br /><span className="text-sm italic text-red-600 ml-1">This field is required</span></>}
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="date">
								Date <span className="text-red-600 ml-1">*</span>
							</label>
							<DateField
								id="date"
								value={expense.date}
								handleOnChange={(date) => setValue("date", date)}
								className="w-full p-2 border border-gray-300 rounded"
							/>
							{(expense.date == undefined || expense.date == "" ) && <><br /><span className="text-sm italic text-red-600 ml-1">This field is required</span></>}
						</div>
						
						<div className="mb-4">
							<label className="block text-gray-700 mb-2" htmlFor="description">
								Description
							</label>
							<textarea
								id="description"
								value={expense.description}
								onChange={(e) => setValue("description", e.target.value)}
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>

						<div className="grid grid-cols-3 gap-x-3">
							<button
								type="submit"
								className="bg-mint-green px-4 py-2 rounded hover:bg-green-300"
								onClick={(e) => handleOnSave(e, false)}
							>
								Save & Go back
							</button>
							<button
								type="submit"
								className="bg-blue-greeny px-4 py-2 rounded hover:bg-teal-400"
								onClick={(e) => handleOnSave(e, true)}
							>
								Save & Continue
							</button>
							<button
								type="button"
								onClick={() => setSubPage(null)}
								className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
							>
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

