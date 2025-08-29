'use client';

import { useCategory } from '@/contexts/CategoryContext';
import { ICategory, SearchFilters } from '@/libs/definations';
import { useEffect, useState } from 'react';
import CategoryItem from '../category/CategoryItem';
import { useAuth } from '@/contexts/AuthContext';
import { getCategoriesFromMap } from '@/libs/utils/categoryUtil';

interface Props {
    onSearch: (filters: SearchFilters) => void;
}

export default function SearchForm({ onSearch }: Props) {
    const { user } = useAuth();
    const { categoryMap } = useCategory();
    const [filters, setFilters] = useState<SearchFilters>({
        user: user!.id,
        categories: Object.keys(categoryMap),
        startDate: '2024-01-01',
        endDate: '2024-12-31'
    });

    useEffect(() => {
        onSearch(filters);
    }, []);

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
            className="p-5 rounded-xl bg-slate-100 space-y-4"
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <div className="space-y-2">
                <label className="block text-sm font-medium">Categories</label>
                <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
                    {getCategoriesFromMap(categoryMap).map((category) => (
                        <div
                            key={`cat_${category.id}`}
                            className={`rounded-lg cursor-pointer p-3 text-black border border-gray-200 ${
                                filters.categories?.includes(category.id!)
                                    ? 'bg-white'
                                    : 'bg-gray-100'
                            }`}
                            onClick={() => handleCategoryChange(category.id!)}
                        >
                            <CategoryItem data={category} />
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md"
            >
                Search
            </button>
        </form>
    );
}
