import DashboardPage from '@/components/dashboard/DashboardPage';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <div className="mx-5">
                <DashboardPage />
            </div>
        </ProtectedRoute>
    );
}
