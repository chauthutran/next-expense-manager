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
import FilterNavigation from "./FilterNavigation";

export default function ExpenseList() {

	const { expenseList } = useExpense();

	const [categoryFilter, setCategoryFilter] = useState("");
	const [startDate, setStartDate] = useState<Date | null>(Utils.getStartDateOfCurrentDate());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	const [dataVisualization, setDataVisualization] = useState<string>(Constant.DATA_VISUALIZATION_DATA_LIST);

	const filterExpenseList = () => {
		console.log("categoryFilter: " + categoryFilter);
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

			return true;
		});

		return filteredList === undefined ? [] : Utils.sortArrayByDate(filteredList);
	}

	const filteredList = filterExpenseList();

	return (
		<div className="w-full flex flex-col">
			<FilterNavigation 
				onSelectCategory={(id: string) => setCategoryFilter(id)}
				onSeleteDataVisualization={(name: string) => setDataVisualization(name)}
				onSeleteStartDate={(date: Date | null) => setStartDate( date )}
				onSelectEndDate={(date: Date | null) => setEndDate( date )}
			/>

			{filteredList.length == 0 && <div className="p-5 text-red-500 italic text-lg">* No data found</div>}
			
			{filteredList.length > 0 && <>

				{/* <!-- Table for larger screens --> */}
				<div className="flex-1 py-3 hidden md:block bg-white mt-4">
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
			</>}
		</div>
	)
}

