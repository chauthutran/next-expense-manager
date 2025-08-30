import BudgetPage from '@/components/budget/BudgetPage';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Budget() {
    return (
        <ProtectedRoute>
            <div className="mx-5">
                <BudgetPage />
            </div>
        </ProtectedRoute>
    );
}
