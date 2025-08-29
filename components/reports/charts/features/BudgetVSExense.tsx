import { useCategory } from '@/contexts/CategoryContext';
import {
    IBudget,
    ICategory,
    IViewChartOption,
    JSONObject
} from '@/libs/definations';
import { formatCurrency } from '@/libs/utils';
import { transformCumulativeDataByMonth } from '@/libs/utils/chartUtils';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Scatter,
    ComposedChart,
    ReferenceArea,
    ReferenceLine,
    LineChart,
    Line,
    Area
} from 'recharts';

export default function BudgetVSExpense({
    data,
    viewOptions
}: {
    data: IBudget[];
    viewOptions: IViewChartOption;
}) {
    const { categoryMap } = useCategory();

    const transformData = (data: IBudget[]) => {
        return data.map((budget) => ({
            category: categoryMap[budget.category]?.name,
            totalExpenses: budget.totalExpenses,
            budgetedAmount: budget.totalLimit,
            variance: budget.totalLimit - (budget.totalExpenses || 0),
            color: categoryMap[budget.category].color
        }));
    };

    const chartData = transformData(data);

    return (
        <>
            {viewOptions.type === 'variance' && (
                <VarianceBarChart data={chartData} />
            )}
            
            {viewOptions.type === 'bar' && (
                <CustomBarChartByCategory data={chartData} />
            )}

            {viewOptions.type === 'composed' && (
                <CustomComposedChart data={chartData} />
            )}

        </>
    );
}

const CustomBarChartByCategory = ({ data }: { data: JSONObject[] }) => {
    console.log("===== data", data);
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 30
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    type="number"
                    tickFormatter={(num) => formatCurrency(num)}
                    angle={-25}
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                />

                <YAxis
                    type="category"
                    dataKey="category"
                    interval={0}
                    tick={{ fontSize: 12 }}
                    width={80}
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
                {/* Budgeted amount bar */}
                <Bar
                    dataKey="budgetedAmount"
                    fill="#cad5e2"
                    name="Budget"
                    barSize={15}
                />

                <Tooltip
                    formatter={(value: number, name: string) => [
                        formatCurrency(value),
                        name
                    ]}
                    cursor={{ fill: 'rgba(0, 102, 255, 0.2)' }}
                />
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
                <YAxis
                    tickFormatter={(value: number) => formatCurrency(value)}
                    tick={{ fontSize: 12 }}
                />

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

                <Tooltip
                    formatter={(value: number, name: string) => [
                        formatCurrency(value),
                        name
                    ]}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

const VarianceBarChart = ({ data }) => {
    // Transform data to calculate variance (budget - actual)
    const transformedData = data.map((item) => {
        const { category, color, budgetedAmount, totalExpenses } = item;
        const budgetVariance = budgetedAmount - totalExpenses;
        return { category, color, budgetVariance };
    });

    // Find the min value for the negative ReferenceArea
    const minValue = Math.min(...transformedData.map((d) => d.value), 0);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={transformedData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
            >
                <CartesianGrid strokeDasharray="3 3" />

                {/* X-axis = values */}
                <XAxis
                    type="number"
                    tickFormatter={(num) => formatCurrency(num)}
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                />

                {/* Y-axis = categories */}
                <YAxis
                    type="category"
                    dataKey="category"
                    width={120}
                    tick={{ fontSize: 12 }}
                />

                {/* Background for negative area */}
                {minValue < 0 && (
                    <ReferenceArea
                        x1={minValue}
                        x2={0}
                        fill="rgba(255, 0, 0, 0.5)"
                    />
                )}

                {/* Bars */}
                <Bar
                    dataKey="budgetVariance"
                    barSize={30}
                    name="Budget Variance"
                >
                    {transformedData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                    ))}
                </Bar>

                {/* Reference line at 0 */}
                <ReferenceLine x={0} stroke="#000" strokeWidth={1} />

                <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    cursor={{ fill: 'rgba(0, 102, 255, 0.1)' }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};
