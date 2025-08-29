import { IExpense } from "@/libs/definations";
import * as Utils from '@/libs/utils';
import MonthlyExpenseTrend from "../reports/charts/features/MonthlyExpenseTrends";

export default function MonthlyBarChart({data}: {data: IExpense[]}) {
    
    return (
        <div className="bg-slate-100 rounded-xl p-3">
            MonthlyBarChart
            {/* <MonthlyExpenseTrend data={data} config={{}} showLabels={false} /> */}
        </div>
    )
}