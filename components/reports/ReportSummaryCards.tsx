import { IExpense } from '@/libs/definations';

/**Red card → overspending alerts.
Green card → under-budget notification.
Blue card → summary of top 3 spending categories.
 */
export default function ReportSummaryCards({ data }: { data: IExpense[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className='space-y-2'>
                {/* Overspending alert */}
                <div className="bg-red-100 text-red-800 p-3 rounded-lg shadow-sm flex justify-between items-center">
                    <span>Over Budget</span>
                    <span className="font-bold">$120</span>
                </div>

                {/* Under budget */}
                <div className="bg-green-100 text-green-800 p-3 rounded-lg shadow-sm flex justify-between items-center">
                    <span>Under Budget</span>
                    <span className="font-bold">$350</span>
                </div>
            </div>

            {/* Top categories */}
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-1">Top Categories</h4>
                <ul className="text-sm list-disc list-inside">
                    <li>Groceries: $390</li>
                    <li>Rent: $1000</li>
                    <li>Entertainment: $150</li>
                </ul>
            </div>
        </div>
    );
}
