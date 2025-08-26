import { useCategory } from '@/contexts/CategoryContext';
import { IBudget, ICategory, JSONObject } from '@/libs/definations';
import { getCategoriesFromMap } from '@/utils/categoryUtil';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    ReferenceLine,
    Area,
    Scatter,
    ComposedChart
} from 'recharts';

export default function BudgetVSExpense({
    data,
    chartType
}: {
    data: IBudget[];
    chartType: string;
}) {
    const { categoryMap } = useCategory();

    const transformData = (data: IBudget[]) => {
        return data.map((budget) => ({
            category: categoryMap[budget.category]?.name,
            totalExpenses: budget.totalExpenses,
            budgetedAmount: budget.totalLimit,
            color: categoryMap[budget.category].color
        }));
    };

    const chartData = transformData(data);

    return (
        <>
            {chartType === 'bar' && <CustomBarChart data={chartData} />}

            {chartType === 'composed' && (
                <CustomComposedChart data={chartData} />
            )}
        </>
    );
}

const CustomBarChart = ({ data }: { data: JSONObject[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="category"
                    interval={0}
                    angle={-40}
                    textAnchor="end"
                    tick={{ fontSize: 10 }}
                />
                <YAxis />
                <Tooltip />

                {/* Budgeted amount bar */}
                <Bar
                    dataKey="budgetedAmount"
                    fill="#cad5e2"
                    name="Budget"
                    barSize={30}
                />

                {/* Actual expenses bar */}
                <Bar dataKey="totalExpenses" barSize={30} name="Expenses">
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.color || '#3b82f6'}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

const CustomComposedChart = ({ data }: { data: JSONObject[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="category"
                    interval={0}
                    angle={-40}
                    textAnchor="end"
                    tick={{ fontSize: 10 }}
                />
                <YAxis />
                <Tooltip />

                {/* Budgeted amount bar */}
                <Bar dataKey="budgetedAmount" name="Budget">
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.color || '#3b82f6'}
                        />
                    ))}
                </Bar>
                
                {/* Actual expenses bar */}
                <Scatter dataKey="totalExpenses" fill="red" name="Expenses" />

            </ComposedChart>
        </ResponsiveContainer>
    );
};
