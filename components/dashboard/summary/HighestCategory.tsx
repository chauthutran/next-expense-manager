import { useCategory } from '@/contexts/CategoryContext';
import { JSONObject } from '@/libs/definations';
import * as Utils from '@/utils';
import { FiTrendingUp } from 'react-icons/fi';

export default function HighestCategory({
    year,
    expenseByYear
}: {
    year: number;
    expenseByYear: JSONObject;
}) {
    const { categoryMap } = useCategory();
    
    // Find max entry
    const [highestCategoryId, highestCategoryTotal] = (
        Object.entries(expenseByYear.groupByCategory) as [string, number][]
    ).reduce((acc, curItem) => (curItem[1] > acc[1] ? curItem : acc), [
        '',
        0
    ] as [string, number]);
    
    return (
        <div className="items-center justify-between bg-slate-100 rounded-xl col-span-2 md:col-span-1 sm:col-span-1">
            <div className="font-bold px-2 pt-3">Highest Category</div>
            <div className="italic text-sm text-gray-500 px-2">
                In year {year}
            </div>

            <div
                className="flex flex-row py-1 px-3 space-x-4 mx-2 my-4 font-semibold text-white rounded-lg"
                style={{
                    backgroundColor:
                       categoryMap[highestCategoryId]?.color || ''
                }}
            >
                <FiTrendingUp className="w-10 h-10 opacity-80" />
                <div className="text-lg p-2">
                    {categoryMap[highestCategoryId]?.name || ''}
                </div>
            </div>

            <div className="flex space-x-3 items-center px-2">
                <div className="rounded-full w-4 h-4 bg-green-500"></div>
                <div>Total: {Utils.formatCurrency(highestCategoryTotal)}</div>
            </div>
        </div>
    );
}
