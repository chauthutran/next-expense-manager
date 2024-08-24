'use client'

import { useCategory } from '@/contexts/CategoryContext';
import { JSONObject } from '@/lib/definations';
import { useRef, useState } from 'react';
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";
import * as Constant from "@/lib/constants";
import { CiViewList } from "react-icons/ci";


export default function CategoryNav({onCategorySelect, onSeleteDataVisualization}: {onCategorySelect: (id: string) => void, onSeleteDataVisualization: (name: string) => void}) {
    const { categoryList } = useCategory();
    const [dataType, setDataType] = useState(Constant.DATA_VISUALIZATION_DATA_LIST);
    const [selectedId, setSelectedId] = useState("");
     

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

    const handleItemSelected = (id: string) => {
        setSelectedId(id);
        onCategorySelect(id);
    }

    return (
        <nav className="relative bg-background-color px-4 shadow-lg text-gray-600 flex flex-row border border-gray-300 items-center">
            <button
                onClick={scrollLeft}
                className="text-living-coral hover:text-ultra-violet"
            >
                <TiMediaPlayReverse size={25} />
            </button>

            {/* Category List */}
            
            <div className={`hover:bg-slate-blue hover:text-white cursor-pointer px-3 rounded-sm ml-5 font-semibold ${selectedId === "" && "bg-slate-blue text-white"}`} onClick={() => handleItemSelected("")}>
                All
            </div>

            <ul
                ref={scrollRef}
                className="flex space-x-5 overflow-x-hidden scroll-smooth mx-10 w-full items-start text-sm"
            >
                {categoryList?.slice(0, 10).map((category: JSONObject, idx: number) => (
                    <li
                        key={`category_${category._id}`}
                        className={`min-w-max hover:bg-slate-blue hover:text-white px-3 cursor-pointer hover:rounded-sm py-1 ${selectedId === category._id && "bg-slate-blue text-white"}`}
                        onClick={() => handleItemSelected(category._id)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>

            <button
                onClick={scrollRight}
                className="text-living-coral px-2 py-2 hover:text-ultra-violet font-bold ml-2"
            >
                <TiMediaPlay size={25} />
            </button>

           <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSeleteDataVisualization(e.target.value)}
                className="pl-2 py-2 bg-slate-300 rounded-md"
            >
                <option value={Constant.DATA_VISUALIZATION_DATA_LIST}>Table List</option>
                <option value={Constant.DATA_VISUALIZATION_DAILY_EXPENSE}>Daily Expenses</option>
                <option value={Constant.DATA_VISUALIZATION_CHART_DISTRIBUTION_BY_CATEGORY}>Expense Distribution by Category</option>
                <option value={Constant.DATA_VISUALIZATION_MONTHLT_EXPENSE_TRENDS}>Monthly Expense Trends </option>
                <option value={Constant.DATA_VISUALIZATION_CHART_EXPENSE_OVERTIME_BY_CATEGORY}>Expenses Over Time by Category</option>
                <option value={Constant.DATA_VISUALIZATION_TOP_5_EXPENSE_CATEGORY}>Top 5 Expense Categories</option>
            </select>

        </nav>
    );
}