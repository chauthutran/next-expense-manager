import { IExpense } from '@/libs/definations';
import Button from '../basics/Button';
import ExpenseList from '../expense/ExpenseList';

export default function ReportDetails({ data }: { data: IExpense[] }) {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Detailed Report</h2>
            <ExpenseList data={data} />

            {/* Export buttons */}
            <div className="mt-4 flex gap-2">
                <Button title="Export CSV" />
                <Button title="Export PDF" />
            </div>
        </div>
    );
}
