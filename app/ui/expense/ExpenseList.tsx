/** Lists all expenses with details such as amount, start date, and end date. */
"use client";

import { useState } from "react"
import ExpenseItem from "./ExpenseItem"
import { JSONObject } from "@/lib/definations";
import * as Constant from "@/lib/constants";
import { useExpense } from "@/contexts/ExpenseContext";
import { useMainUi } from "@/contexts/MainUiContext";
import * as AppStore from "@/lib/appStore";
import { useCategory } from "@/contexts/CategoryContext";
import CustomDatePicker from "@/ui/basics/DatePicker";
import * as Utils from "@/lib/utils";
import CategoryNavigation from "./CategoryNavigation";

export default function ExpenseList() {

	const { setSubPage } = useMainUi();
	const { expenseList } = useExpense();
	const { categoryList } = useCategory();

	const [categoryFilter, setCategoryFilter] = useState("");
	const [startDate, setStartDate] = useState<Date | null>(Utils.getStartDateOfCurrentDate());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	const [hasBudget, setHasBudget] = useState(false);


	const filterExpenseList = () => {
		let filteredList = expenseList?.filter((item) => {

			if (categoryFilter != "" && item.categoryId != categoryFilter) {
				return false;
			}
			if (startDate != null && item.date < Utils.formatDateObjToDbDate(startDate)) {
				return false;
			}
			if (endDate != null && item.date > Utils.formatDateObjToDbDate(endDate)) {
				return false;
			}
			if (hasBudget && item.budgetId === undefined) {
				return false;
			}

			return true;
		});

		return filteredList === undefined ? [] : Utils.sortArrayByDate(filteredList);
	}

	const filteredList = filterExpenseList();

	return (
		<div className="w-full flex flex-col bg-background-color">
			<CategoryNavigation onSelect={(id: string) => setCategoryFilter(id)}/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 mt-5 gap-x-3 mb-4">
				{/* For date range */}
				<CustomDatePicker
					label="Start Date"
					id="startDate"
					selectedDate={startDate}
					onDateChange={(date: Date | null) => { setStartDate(date) }}
				/>

				<CustomDatePicker
					label="End Date"
					id="endDate"
					selectedDate={endDate}
					onDateChange={(date: Date | null) => { setEndDate(date) }}
				/>

				<div className="flex flex-col justify-end">
					<label className="block text-gray-700 text-sm ">&nbsp;</label>
					<button
						className="bg-mint-green text-gray-800 px-10 py-2 rounded-md mt-auto"
						onClick={() => { AppStore.setSelected(null); setSubPage(Constant.SUB_UI_ADD_FORM) }}>Chart</button>
				</div>

				<div className="flex flex-col justify-end">
					<label className="block text-gray-700 text-sm ">&nbsp;</label>
					<button
						className="bg-grandpa-orange text-gray-800 px-10 py-2 rounded-md mt-auto"
						onClick={() => { AppStore.setSelected(null); setSubPage(Constant.SUB_UI_ADD_FORM) }}>Add</button>
				</div>
			</div>

			{/* <!-- Table for larger screens --> */}
			<div className="flex-1 py-3 hidden md:block shadow-lg bg-white mt-4">
				{/* <div className=" overflow-y-auto h-[calc(100vh-270px)]"> */}
				<div className=" overflow-y-auto">
					<div className="grid grid-cols-5 gap-y-4">
						<div className="px-4 py-2 text-left font-medium border-b border-gray-300">Date</div>
						<div className="px-4 py-2 text-left font-medium border-b border-gray-300">Category</div>
						<div className="px-4 py-2 text-left font-medium border-b border-gray-300">Amount</div>
						<div className="px-4 py-2 text-left font-medium border-b border-gray-300">Description</div>
						<div className="px-4 py-2 font-medium border-b border-gray-300 col-start-5 col-end-6 text-right">#</div> 
						

						{filteredList.map((expense: JSONObject, index: number) => (
							<ExpenseItem style="large" key={expense._id} data={expense} index={index} />
						))}
					</div>
				</div>
			</div>

			{/* <!-- Divs for smaller screens --> */}
			<div className="md:hidden bg-white">
				{filteredList.map((expense: JSONObject, index: number) => (
					<ExpenseItem style="small" key={expense._id} data={expense} index={index} />
				))}
			</div>

		</div>
	)
}

