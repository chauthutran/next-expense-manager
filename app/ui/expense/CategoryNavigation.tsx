'use client'

import { useCategory } from '@/contexts/CategoryContext';
import { JSONObject } from '@/lib/definations';
import { useRef } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


export default function CategoryNav({onSelect}: {onSelect: (id: string) => void}) {
    const { categoryList } = useCategory();

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

    return (
        <nav className="relative bg-teal-green px-4 py-1 shadow-lg text-white flex flex-row">
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 px-2 py-2 hover:bg-teal-700"
            >
                <IoIosArrowBack />
            </button>

            <div className="min-w-max bg-ultra-violet hover:bg-slate-blue cursor-pointer px-3 rounded-sm ml-5" onClick={() => onSelect("")}>
                All
            </div>

            <ul
                ref={scrollRef}
                className="flex space-x-5 overflow-x-hidden scroll-smooth mx-10 w-full items-start"
            >
                {categoryList?.slice(0, 10).map((category: JSONObject, idx: number) => (
                    <li
                        key={`category_${category._id}`}
                        className="min-w-max hover:bg-soft-peach hover:text-gray-600 px-3 cursor-pointer hover:rounded-sm"
                        onClick={() => onSelect(category._id)}
                    >
                        {category.name}
                    </li>
                ))}
            </ul>

            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-2 hover:bg-teal-700 ml-2"
            >
                <IoIosArrowForward />
            </button>
        </nav>
    );
}