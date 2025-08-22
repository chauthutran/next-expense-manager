import { IExpense } from '@/libs/definations';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({
	data,
	itemOnShowEditForm,
	itemOnDelete
}: {
	data: IExpense[];
	itemOnShowEditForm: (item: IExpense) => void;
	itemOnDelete: (item: IExpense) => void;
}) {
	if (data.length === 0) return <p>No expenses found.</p>;

	return (
		<div className="mt-3 space-y-4">
			{/* Header */}
			<h2 className="text-2xl font-bold text-gray-800">
				{data.length > 0
					? `Found ${data.length} Expense${data.length > 1 ? 's' : ''}`
					: 'No Expenses Found'}
			</h2>
			<p className="text-gray-500 italic">
				Use the filters above to refine your expense search.
			</p>

			{/* List */}
			{/* <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 divide-y divide-gray-300"> */}
			<div className="space-y-2">
				{data.map((expense: IExpense) => (
					<ExpenseItem
						key={`expense_${expense.id}`}
						data={expense}
						itemOnShowEditForm={() => itemOnShowEditForm(expense)}
						itemOnDelete={() => itemOnDelete(expense)}
					/>
				))}
			</div>
		</div>
	);
}
