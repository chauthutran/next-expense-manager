'use client'

import { useCategory } from '@/contexts/CategoryContext';
import { JSONObject } from '@/lib/definations';
import { useRef, useState } from 'react';
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";
import * as Constant from "@/lib/constants";
import CustomDatePicker from '../basics/DatePicker';
import * as Utils from "@/lib/utils";
import * as AppStore from "@/lib/appStore";
import { useMainUi } from '@/contexts/MainUiContext';
import { MdPostAdd } from "react-icons/md";


export default function FilterNavigation({ onSelectCategory, onSeleteDataVisualization, onSeleteStartDate, onSelectEndDate }: { onSelectCategory: (id: string) => void, onSeleteDataVisualization: (name: string) => void, onSeleteStartDate: (date: Date | null) => void, onSelectEndDate: (date: Date | null) => void }) {
    const { categoryList } = useCategory();

    const [dataVisualization, setDataVisualization] = useState<string>(Constant.DATA_VISUALIZATION_DATA_LIST);
    const [startDate, setStartDate] = useState<Date | null>(Utils.getStartDateOfCurrentDate());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const { setSubPage } = useMainUi();

    const scrollRef = useRef<HTMLUListElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -150, // Adjust the scroll distance as needed
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 150, // Adjust the scroll distance as needed
                behavior: 'smooth',
            });
        }
    };

    const dataVisualizationList = [
        {id: Constant.DATA_VISUALIZATION_DATA_LIST, name: "Table List"},
        {id: Constant.DATA_VISUALIZATION_DAILY_EXPENSE, name: "Daily Expenses"},
        {id: Constant.DATA_VISUALIZATION_DISTRIBUTION_BY_CATEGORY, name: "Expense Distribution by Category"},
        {id: Constant.DATA_VISUALIZATION_MONTHLT_EXPENSE_TRENDS, name: "Monthly Expense Trends"},
        {id: Constant.DATA_VISUALIZATION_EXPENSE_OVERTIME_BY_CATEGORY, name: "Expenses Over Time by Category"},
        {id: Constant.DATA_VISUALIZATION_TOP_5_EXPENSE_CATEGORY, name: "Top 5 Expense Categories"}
    ];

    return (
        <nav className="bg-background-color text-gray-700">
            <div className="relative pl-4 pr-2 flex flex-row border border-gray-300 items-center">
                <button
                    onClick={scrollLeft}
                    className="text-living-coral hover:text-deep-coral"
                >
                    <TiMediaPlayReverse size={25} />
                </button>

                <ul className="flex space-x-5 overflow-x-hidden scroll-smooth w-full items-start text-sm" ref={scrollRef}>
                    {dataVisualizationList.map((item: JSONObject, idx: number) => (
                        <li
                            key={`dataVisual_${idx}`}
                            onClick={() => {setDataVisualization(item.id); onSeleteDataVisualization(item.id);}}
                            className={`min-w-max hover:bg-slate-blue hover:text-white px-3 cursor-pointer hover:rounded-sm py-1 border-r border-gray-400 justify-center ${dataVisualization == item.id && "bg-slate-blue text-gray-100"}`}>
                                {item.name}
                        </li>
                    ))}
                   
                </ul>

                <button
                    onClick={scrollRight}
                    className="text-living-coral px-2 py-2 hover:text-deep-coral font-bold ml-2"
                >
                    <TiMediaPlay size={25} />
                </button>

                <button
                    className="ml-2 items-center justify-center"
                    onClick={() => { AppStore.setSelected(null); setSubPage(Constant.SUB_UI_ADD_FORM) }}><MdPostAdd className="text-black" size={25} /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 px-5 mt-3 gap-x-3 mb-4  text-gray-600 items-center">

                <div className="mb-3">
                    <CustomDatePicker
                        label="Start Date"
                        id="startDate"
                        selectedDate={startDate}
                        onDateChange={(date: Date | null) => { setStartDate(date); onSeleteStartDate(date); }}
                    />
                </div>

                <div className="mb-3">
                    <CustomDatePicker
                        label="End Date"
                        id="endDate"
                        selectedDate={endDate}
                        onDateChange={(date: Date | null) => { setEndDate(date); onSelectEndDate(date) }}
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-700 mb-2 text-sm" htmlFor="category">Category</label>
                    <select
                        id="category"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSelectCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All</option>
                        {categoryList?.slice(0, 10).map((category: JSONObject, idx: number) => (
                            <option
                                key={`category_${category._id}`}
                                value={category._id}
                                className={`min-w-max hover:bg-slate-blue hover:text-white px-3 cursor-pointer hover:rounded-sm py-1`}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </nav>
    );
}