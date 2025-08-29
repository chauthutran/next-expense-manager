import { useCategory } from '@/contexts/CategoryContext';
import { IBudget, IViewChartOption, JSONObject } from '@/libs/definations';
import { formatCurrency } from '@/libs/utils';
import { transformCumulativeDataByMonth } from '@/libs/utils/chartUtils';
import {
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    LineChart,
    Line,
    Area
} from 'recharts';
import * as Constant from '@/libs/constants';

export default function CumulativeExpenses({
    data,
    viewOptions
}: {
    data: IBudget[];
    viewOptions: IViewChartOption;
}) {
    const chartData = transformCumulativeDataByMonth(data);

    return (
        <>
            {viewOptions.type === 'line' && (
                <CumulativeLineChart data={chartData} />
            )}

            {viewOptions.type === 'bar' && (
                <CumulativeBarChart data={chartData} />
            )}

            {viewOptions.type === 'area' && (
                <CumulativeAreaChart data={chartData} />
            )}
        </>
    );
}

const CumulativeLineChart = ({ data }: { data: JSONObject[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    interval={0}
                    angle={-35}
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    tickFormatter={(value: number) => formatCurrency(value)}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                />
                <Line
                    type="monotone"
                    dataKey="cumulativeBudget"
                    stroke={Constant.COLOR_BUDGET}
                    name="Budget"
                    strokeWidth={2}
                />
                <Line
                    type="monotone"
                    dataKey="cumulativeActual"
                    stroke={Constant.COLOR_EXPENSE}
                    name="Actual"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

const CumulativeBarChart = ({ data }: { data: JSONObject[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    interval={0}
                    angle={-35}
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    tickFormatter={(value: number) => formatCurrency(value)}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                />
                <Bar
                    type="monotone"
                    dataKey="cumulativeActual"
                    fill={Constant.COLOR_EXPENSE}
                    name="Actual"
                    barSize={23}
                />
                <Line
                    type="monotone"
                    dataKey="cumulativeBudget"
                    stroke={Constant.COLOR_BUDGET}
                    name="Budget"
                    strokeWidth={2}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

const CumulativeAreaChart = ({ data }: { data: JSONObject[] }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="month"
                    interval={0}
                    angle={-35}
                    textAnchor="end"
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    tickFormatter={(value: number) => formatCurrency(value)}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                />
                <Line
                    type="monotone"
                    dataKey="cumulativeBudget"
                    stroke={Constant.COLOR_BUDGET}
                    name="Budget"
                    strokeWidth={2}
                />
                <Area
                    type="monotone"
                    dataKey="cumulativeActual"
                    fill={Constant.COLOR_EXPENSE}
                    stroke="#f87171"
                    name="Actual"
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};
