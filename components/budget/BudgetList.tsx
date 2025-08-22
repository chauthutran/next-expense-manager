import { IBudget } from '@/libs/definations';
import BudgetItem from './BudgetItem';

export default function BudgetList({
    data,
    itemOnShowEditForm,
    itemOnDelete
}: {
    data: IBudget[];
    itemOnShowEditForm: (item: IBudget) => void;
    itemOnDelete: (item: IBudget) => void;
}) {
    if (data.length === 0) return <p>No budgets found.</p>;

    return (
        <div className="mt-3 space-y-4">
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800">
                {data.length > 0
                    ? `Found ${data.length} Budget${data.length > 1 ? 's' : ''}`
                    : 'No Budgets Found'}
            </h2>
            <p className="text-gray-500 italic">
                Use the filters above to refine your budget search.
            </p>

            {/* List */}
            {data.length > 0 ? (
                data.map((budget: IBudget) => (
                    <BudgetItem
                        key={`budget_${budget.id}`}
                        data={budget}
                        itemOnShowEditForm={() => itemOnShowEditForm(budget)}
                        itemOnDelete={() => itemOnDelete(budget)}
                    />
                ))
            ) : (
                <div className="text-center text-gray-500 py-6">
                    No budgets found.
                </div>
            )}
        </div>
    );
}
