import CategoryLegend from '@/components/reports/charts/CategoryLegend';
import DistributionByCatergories from '@/components/reports/charts/DistributionByCatergories';
import { IExpense } from '@/libs/definations';

export default function ExpenseDistribution({
    year,
    dataList
}: {
    year: number;
    dataList: IExpense[];
}) {
    return (
        <div className="rounded-xl bg-slate-100 flex flex-1 col-span-2">
            {/* <div className="rounded-xl bg-slate-100 h-[255px] flex flex-col p-4 shadow-md"> */}
            <div className="flex flex-col">
                <div className="font-bold px-2 pt-3">Expense Distribution</div>
                <div className="italic text-sm text-gray-500 px-2">
                    In year {year}
                </div>
                <DistributionByCatergories
                    data={dataList}
                    showLabels={false}
                    width={200}
                    heigh={200}
                />
            </div>
            <div className="grid-cols-2 gap-1 text-xs space-y-1 justify-between mt-4">
                <CategoryLegend />
            </div>
        </div>
    );
}
