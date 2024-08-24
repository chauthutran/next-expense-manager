'use client'

import { useCategory } from '@/contexts/CategoryContext';
import { JSONObject } from '@/lib/definations';
import { useRef, useState } from 'react';
import { TiMediaPlayReverse } from "react-icons/ti";
import { TiMediaPlay } from "react-icons/ti";
import { FcComboChart } from "react-icons/fc";
import { CiViewList } from "react-icons/ci";


export default function CategoryNav({onSelect}: {onSelect: (id: string) => void}) {
    const { categoryList } = useCategory();
    const [showChart, setShowChart] = useState(false);
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
        onSelect(id);
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
            {!showChart && <>
                <div className={`hover:bg-slate-blue cursor-pointer px-3 rounded-sm ml-5 font-semibold ${selectedId === "" && "bg-slate-blue text-white"}`} onClick={() => handleItemSelected("")}>
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

            </> }

            {showChart && <>
            
            </>}

            <button
                onClick={scrollRight}
                className="text-living-coral px-2 py-2 hover:text-ultra-violet font-bold ml-2"
            >
                <TiMediaPlay size={25} />
            </button>

            {showChart && <button
                onClick={() => setShowChart(false)}
                className="px-2 py-2 hover:bg-slate-400 mx-2 rounded-full"
            >
                <CiViewList className="text-teal-green hover:text-gray-600" size={20} />
            </button>}

            {!showChart && <button
                onClick={() => setShowChart(true)}
                className="px-2 py-2 hover:bg-slate-400 mx-2 rounded-full"
            >
                <FcComboChart className=" hover:text-gray-600" size={20} />
            </button>}

        </nav>
    );
}