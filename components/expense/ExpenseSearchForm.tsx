'use client';

import { useCategory } from '@/contexts/CategoryContext';
import { ICategory, SearchFilters } from '@/libs/definations';
import { useState } from 'react';
import CategoryItem from '../category/CategoryItem';
import { useAuth } from '@/contexts/AuthContext';
import { getCategoriesFromMap } from '@/libs/utils/categoryUtil';


interface Props {
    onSearch: (filters: SearchFilters) => void;
}

export default function BudgetSearchForm({ onSearch }: Props) {
    const { user } = useAuth();
    const { categoryMap } = useCategory();
    const [filters, setFilters] = useState<SearchFilters>({
        user: user!.id,
        categories: [],
        startDate: '',
        endDate: ''
    });

    const handleCategoryChange = (categoryId: string) => {
        setFilters((prev) => {
            const alreadySelected = prev.categories?.includes(categoryId);
            return {
                ...prev,
                categories: alreadySelected
                    ? prev.categories?.filter((c) => c !== categoryId)
                    : [...(prev.categories || []), categoryId]
            };
        });
    };
    
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSearch(filters);
            }}
            className="p-3 rounded-xl bg-slate-100 space-y-4"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                startDate: e.target.value
                            })
                        }
                        className="w-full border rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) =>
                            setFilters({ ...filters, endDate: e.target.value })
                        }
                        className="w-full border rounded-md p-2"
                    />
                </div>
            </div>

            <div className="pt-5 space-y-5">
                <label className="block text-sm font-medium mb-1">
                    Categories
                </label>
                <div className="grid grid-cols-6 gap-2">
                    {getCategoriesFromMap(categoryMap).map((category: ICategory) => (
                        <div
                            key={`cat_${category.id}`}
                            className={`cursor-pointer p-3 text-black ${filters.categories?.includes(
                                category.id!
                            ) ? "bg-blue-100" : "bg-white"} `}
                            onClick={() => handleCategoryChange(category.id!)}
                        >
                            <CategoryItem data={category} />
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
                Search
            </button>
        </form>
    );
}