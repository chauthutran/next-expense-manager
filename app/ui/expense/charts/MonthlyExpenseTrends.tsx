
// 2. Monthly Expense Trends (Line Chart)
// Purpose: Displays expenses over time, typically on a monthly basis.
// Use Case: Helps users track changes in their spending over time, identify trends, and plan future budgets.

import { useCategory } from "@/contexts/CategoryContext";
import { useExpense } from "@/contexts/ExpenseContext";
import { JSONObject } from "@/lib/definations";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer } from "recharts";
import * as Utils from "@/lib/utils";
import CategoryLegend from "./CategoryLegend";


export default function MontlyExpenseTrend({ data }: { data: JSONObject[] }) {

	const { categoryList } = useCategory();

    const MONTHS_SHORTNAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    const transformData = (): JSONObject[] => {
        const result = {};

        data.forEach((item) => {
          const date = new Date(item.date);
          const category = Utils.findItemFromList(categoryList!, item.categoryId, "_id")!;
          const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Extract month-year
      
          // If the month-year doesn't exist in the result, initialize it
          if (!result[monthYear]) {
            result[monthYear] = { time: monthYear };
          }
      
          // Accumulate totals by categoryId
          if (result[monthYear][category.name]) {
            result[monthYear][category.name] += item.amount;
          } else {
            result[monthYear][category.name] = item.amount;
          }
        });
      
        return Object.values(result);
    }

    const transformedData = transformData();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-5 mt-3 gap-x-3 mb-4 items-center">
            {/* Pie Chart Container - Place in the first column */}
            <div className="flex justify-end items-center col-span-2">
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            // width={500}
                            // height={300}
                            data={transformedData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }} 
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />

                            {categoryList!.map((category: JSONObject, idx: number) => {
                                return (
                                    <Bar key={`key_${idx}`} dataKey={category.name} stackId="a" fill={category.color} />
                                )
                            })}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category List - Place in the second column */}
			<div className="flex flex-col items-start justify-between w-64">
				<CategoryLegend />
			</div>
        </div>
    );
}
