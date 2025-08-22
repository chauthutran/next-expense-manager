'use client';

import ExpensePage from '@/components/expense/ExpensePage';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TableList() {
    return (
        <ProtectedRoute>
            <ExpensePage />
        </ProtectedRoute>
    );
}
