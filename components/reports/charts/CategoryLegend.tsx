'use client';

import { useCategory } from '@/contexts/CategoryContext';
import { getCategoriesFromMap } from '@/utils/categoryUtil';

export default function CategoryLegend() {
    const { categoryMap } = useCategory();

    return (
        <div className="flex flex-col items-start justify-center h-full w-full">
            {getCategoriesFromMap(categoryMap).map((category) => (
                <div className="flex items-center text-sm space-y-1" key={category.id}>
                    <div
                        style={{ backgroundColor: category.color }}
                        className="w-4 h-4 rounded-full"
                    />
                    <div className="px-3 whitespace-nowrap">
                        {category.name}
                    </div>
                </div>
            ))}
        </div>
    );
}
