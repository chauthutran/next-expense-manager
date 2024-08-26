import { JSONObject } from "@/lib/definations";
import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import * as Colors from "@/lib/colors";
import { useCategory } from "@/contexts/CategoryContext";
import * as Utils from "@/lib/utils";


export default function DistributionByCatergories({ data }: { data: JSONObject[] }) {

	const { categoryList } = useCategory();

	const transformedData = data.reduce((acc: JSONObject[], expense: JSONObject) => {
		const { categoryId, amount } = expense;
		const categoryName = Utils.findItemFromList(categoryList!, categoryId, "_id")!.name;
		const existingCategory = acc.find(item => item.categoryId === categoryId);
		if (existingCategory) {
			existingCategory.total += amount;
		} else {
			acc.push({ categoryName, total: amount });
		}
		return acc;
	}, []) as JSONObject[];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-5 mt-3 gap-x-3 mb-4 items-center">
			{/* Pie Chart Container - Place in the first column */}
			<div className="flex justify-end items-center">
				<div className="w-full max-w-[500px]"> {/* Adjust max-width as needed */}
					<ResponsiveContainer width="100%" height={400}>
						<PieChart>
							<Pie
								data={transformedData}
								nameKey="categoryName"
								dataKey="total"
								cx={200}
								cy={200}
								label
							>
								{transformedData.map((entry, index) => (
									<Cell key={`cell-${JSON.stringify(entry)}`} fill={Colors.categoryColors[entry.categoryName]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Category List - Place in the second column */}
			<div className="flex flex-col items-start justify-between">
				{Object.keys(Colors.categoryColors).map((categoryName, idx) => (
					<div className="flex flex-row m-1 items-center justify-between" key={categoryName}>
						<div style={{ backgroundColor: Colors.categoryColors[categoryName] }} className="w-4 h-4 rounded-full"></div>
						<div className="px-3 text-right whitespace-nowrap">{categoryName}</div>
					</div>
				))}
			</div>
		</div>
	);
}
