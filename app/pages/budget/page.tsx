import BudgetPage from "@/components/budget/BudgetPage";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Budget() {
    return (
        <ProtectedRoute>
            <BudgetPage />
        </ProtectedRoute>
    )
}