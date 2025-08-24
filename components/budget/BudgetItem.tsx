import { useCategory } from '@/contexts/CategoryContext';
import { IBudget } from '@/libs/definations';
import { calculatePercent, cleanSvg } from '@/utils';
import Button from '../basics/Button';

export default function BudgetItem({
    data,
    itemOnShowEditForm,
    itemOnDelete,
    
}: {
    data: IBudget;
    itemOnShowEditForm: (item: IBudget) => void;
    itemOnDelete: (item: IBudget) => void;
}) {
    const { categoryMap } = useCategory();

    const category = categoryMap[data.category];
    const percentage = calculatePercent({
        value: data.totalExpenses || 0,
        max: data.totalLimit
    });
    const isOverBudget = percentage > 100;
    const cappedPercent = Math.min(percentage, 100); // stop overflow
    const sanitizedIcon = cleanSvg(category.icon);

    return (
        <div
            key={data.id}
            className="bg-white grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-5 border-b border-gray-200 py-3"
        >
            <div className="flex flex-row space-x-3 items-center">
                <div
                    className="w-8 h-8"
                    dangerouslySetInnerHTML={{ __html: sanitizedIcon }}
                />
                <div className="flex flex-col">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-gray-500 text-sm">{category?.name}</p>
                    <p className="text-gray-700 text-sm mt-1">
                        Used: ${data.totalExpenses} / ${data.totalLimit}
                    </p>
                </div>
            </div>

            <div className="w-full">
                <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden relative">
                    {/* Progress Fill */}
                    <div
                        className={`h-full transition-all duration-700 ease-out rounded-lg ${
                            isOverBudget
                                ? 'bg-red-700 '
                                : percentage > 80
                                ? 'bg-orange-400'
                                : percentage > 50
                                ? 'bg-yellow-500'
                                : 'bg-blue-600'
                        }`}
                        style={{ width: `${cappedPercent}%` }}
                    />
                </div>

                {/* Optional Helper Text */}
                <div className="text-right mt-1 text-xs text-gray-500">
                    {percentage.toFixed(2)}% of budget used
                </div>
            </div>

            <div className="space-x-3">
                <Button
                    title="Edit"
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => itemOnShowEditForm(data)}
                />
                <Button
                    title="Delete"
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => itemOnDelete(data)}
                />
            </div>
        </div>
    );
}
