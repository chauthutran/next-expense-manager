import { useCategory } from '@/contexts/CategoryContext';
import { IBudget } from '@/libs/definations';
import ProgressBar from '../reports/charts/basic/ProgressBar';

export default function CategoryWiseExpenses({
    year,
    budgets
}: {
    year: number
    budgets: IBudget[];
}) {
    const { categoryMap } = useCategory();

    return (
        <div className="flex flex-col space-y-2">
            <div className="font-bold px-2 pt-3">Category wise Expenses in {year}</div>

            <div className="bg-slate-100 rounded-xl grid grid-cols-5 gap-4">
                {budgets.map((item: IBudget, index: number) => {
                    const category = categoryMap[item.category];

                    return (
                        <div
                            key={`prg_${index}`}
                            className="rounded-xl bg-slate-100 p-4"
                        >
                            <ProgressBar
                                value={item.totalExpenses || 0}
                                max={item.totalLimit}
                                label={category.name}
                                color={category.color}
                                icon={category?.icon || ''}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
