import { useCategory } from "@/contexts/CategoryContext";
import { groupExpenseByCategories } from "@/utils/expenseUtils";
import ProgressBar from "../reports/charts/ProgressBar";
import { IExpense } from "@/libs/definations";

export default function CategoryWiseExpenses({ expenses }: { expenses: IExpense[] }) {
    const { categoryMap} = useCategory();
        
    const transformedData = groupExpenseByCategories(expenses, categoryMap);
    const totalAmount = transformedData.reduce((sum: number, { total }) =>  sum + total, 0);

    return (
        <div className="grid grid-cols-5 gap-4 py-5" >
            {transformedData.map((item, index) => (
                <div 
                    key={`prg_${index}`}
                    className="rounded-xl bg-slate-100 p-5"
                >
                    <ProgressBar 
                        value={item.total}
                        max={totalAmount}
                        label={item.categoryName}
                        color={item.color}
                        icon={item.icon}
                    />
                </div>
            ))}
        </div>
    )
}