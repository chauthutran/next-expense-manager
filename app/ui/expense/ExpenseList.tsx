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
		<div className="w-full flex flex-col">
			<CategoryNavigation onSelect={(id: string) => setCategoryFilter(id)}/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-5 py-3 ">
				{/* <div>
					<label className="block mb-2 text-sm" htmlFor='categoryFilter'>Category Filter</label>
					<select
						id="categoryFilter"
						// value={selectedReportType}
						onChange={e => setCategoryFilter(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					>
						<option value="">All</option>
						{categoryList != null && categoryList.map((caterogy, index) => (
							<option key={index} value={caterogy._id}>
								{caterogy.name}
							</option>
						))}
					</select>
				</div> */}

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

				<div>
					<label className="block text-gray-700 mb-2 text-sm">&nbsp;</label>
					<button
						className="bg-gold text-gray-600 px-10 py-2 rounded-md"
						onClick={() => { AppStore.setSelected(null); setSubPage(Constant.SUB_UI_ADD_FORM) }}>Add</button>
				</div>

				<div className="italic text-teal-green">
					<span>There is {filteredList.length} item(s)</span></div>
			</div>

			{/* <!-- Table for larger screens --> */}
			<div className="flex-1 p-3 hidden md:block">
				{/* <div className=" overflow-y-auto h-[calc(100vh-270px)]"> */}
				<div className=" overflow-y-auto ">
					{/* <div className="overflow-y-auto"> */}
					<table className="min-w-full border border-red-800 text-white">
						<thead className="bg-teal-green">
							<tr className="border border-sky-blue">
								<th className="px-4 py-2 text-left font-normal">Date</th>
								<th className="px-4 py-2 text-left font-normal">Category</th>
								<th className="px-4 py-2 text-left font-normal">Amount</th>
								<th className="px-4 py-2 text-left font-normal">Description</th>
								<th className="px-4 py-2 text-left font-normal">Budget related</th>
								<th className="px-4 py-2 font-normal">#</th>
							</tr>
						</thead>
						<tbody>
							{filteredList.map((expense: JSONObject, index: number) => (
								<ExpenseItem style="large" key={expense._id} data={expense} index={index} />
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* <!-- Divs for smaller screens --> */}
			<div className="md:hidden">
				{filteredList.map((expense: JSONObject, index: number) => (
					<ExpenseItem style="small" key={expense._id} data={expense} index={index} />
				))}
			</div>

		</div>
	)
}

