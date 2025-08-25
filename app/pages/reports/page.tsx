'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import ReportsPage from '@/components/reports/ReportsPage';

export default function Reports() {
    return (
        <ProtectedRoute>
            <ReportsPage />
        </ProtectedRoute>
    );
}
