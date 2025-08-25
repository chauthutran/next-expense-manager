import { IExpense } from "@/libs/definations";
import MonthlyExpenseTrend from "../reports/charts/MonthlyExpenseTrends";
import * as Utils from '@/utils';

export default function MonthlyBarChart({data}: {data: IExpense[]}) {
    
    return (
        <div className="bg-slate-100 rounded-xl p-3">
            <MonthlyExpenseTrend data={data} config={{}} showLabels={false} />
        </div>
    )
}