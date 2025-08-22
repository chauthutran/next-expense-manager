import MonthlyExpenseTrend from "../charts/MonthlyExpenseTrends";
import * as Utils from '@/utils';

export default function MonthlyBarChart({year}: {year: number}) {
    
    // const { expenseList } = useExpense();
        
    const filterExpenseListByYear = Utils.filterExpenseListByYear(year, []);
    
    return (
        <div className="bg-slate-100 rounded-xl p-3">
            <MonthlyExpenseTrend data={filterExpenseListByYear} showLabels={false} />
        </div>
    )
}