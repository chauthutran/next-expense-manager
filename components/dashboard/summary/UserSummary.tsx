import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/libs/definations';
import { formatCurrency, formatDisplayDateObj } from '@/libs/utils';
import Image from 'next/image';

export default function UserSummary({
    year,
    expenseByYear
}: {
    year: number;
    expenseByYear: JSONObject;
}) {
    const { user } = useAuth();

    const calAvgDailyExpense = (totalOfYear: number) => {
        return formatCurrency(totalOfYear / 365);
    };

    return (
        <div className="flex bg-gradient-to-r col-span-2 from-white via-slate-100 to-slate-100 rounded-xl">
            {/* Big Circle with Icon/Image */}
            <div className="rounded-full bg-blue-100 flex items-center p-10">
                <Image src="/user.svg" alt="User" width={150} height={150} />
            </div>

            {/* User information and Summary */}
            <div className="flex items-center">
                <div className="flex flex-col mx-4">
                    <div className="text-lg text-gray-600">Welcome,</div>
                    <div className="text-xl sm:text-2xl font-semibold text-black truncate">
                        {user?.email}!
                    </div>
                    <div className="text-sm italic text-gray-500">
                        {formatDisplayDateObj(new Date())}
                    </div>

                    <div className="flex items-center mt-3 sm:mt-5 text-base sm:text-lg font-semibold text-black">
                        <div
                            className="px-4 py-2 bg-blue-100 rounded-l-lg"
                            style={{
                                backgroundImage:
                                    'repeating-linear-gradient(45deg, #93c5fd 0 1px, transparent 1px 8px)'
                            }}
                        >
                            Summary Year
                        </div>
                        <div className="px-4 py-2 bg-blue-100 rounded-r-lg">
                            {year}
                        </div>
                    </div>

                    <div className="mt-3 sm:mt-4 space-y-2 text-sm sm:text-base">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>
                                Total Expenses:{' '}
                                {formatCurrency(expenseByYear.total)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>
                                Avg Daily Expense:{' '}
                                {calAvgDailyExpense(expenseByYear.total)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
