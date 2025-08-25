import { useCategory } from '@/contexts/CategoryContext';
import { IExpense } from '@/libs/definations';
import { groupExpenseByCategories } from '@/utils';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export default function CustomDoughnutChart({ data }: { data: IExpense[] }) {
    const { categoryMap } = useCategory();
    const transformedData = groupExpenseByCategories(data, categoryMap);
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
               <Pie
                    dataKey="value"
                    data={transformedData}
                    cx={500}
                    cy={200}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#82ca9d"
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
