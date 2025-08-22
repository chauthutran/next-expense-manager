'use client';

import { ExpenseService } from '@/services/expenseService';
import SearchForm from '../layout/SearchForm';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { IExpense, IMessage, SearchFilters } from '@/libs/definations';
import FloatButton from '../basics/FloatButton';
import Modal from '../basics/Modal';
import * as Constant from '@/libs/constants';
import Alert from '../basics/Alert';
import { createMessage } from '@/utils';
import LoadingIcon from '../basics/LoadingIcon';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';

export default function ExpensePage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState<IMessage>(createMessage());
    const [data, setData] = useState<IExpense[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
    const [filters, setFilters] = useState<SearchFilters | null>(null); // keep last filters
    
    const fetchExpenses = async (_filters: SearchFilters) => {
        setLoading(true);
        const responseData = await ExpenseService.findExpenses(_filters);
        if (responseData.success) {
            setData(responseData.data);
        } else {
            setError(responseData.message!);
        }
        setLoading(false);
    }

    const handleOnSearch = async (filters: SearchFilters) => {
        setError('');
        setFilters(filters);
        
        await fetchExpenses(filters);
    };

    const handleOnAdd = () => {
        setSelectedExpense(null);
        setShowForm(true);
    };
    const handleOnEdit = async (item: IExpense) => {
        setSelectedExpense(item);
        setShowForm(true);
    };
    
    const handleOnSaved = async () => {
        setShowForm(false);
        if (filters) {
            await handleOnSearch(filters); // Refresh the expense list with last filters
        }
    };

    const handleOnDelete = async (item: IExpense) => {
        const ok = confirm(
            `Are you sure you want to delete the expense ?`
        );
        if (ok) {
            setLoading(true);
            const response = await ExpenseService.delete(item.id!);
            if (response.success) {
                setLoading(false);
                setMessage({
                    type: Constant.ALERT_TYPE_SUCCESS,
                    msg: `The expense is deleted !`
                });
                fetchExpenses(filters!);
            } else {
                setMessage({
                    type: Constant.ALERT_TYPE_ERROR,
                    msg: response.message!,
                });
            }
        }
    };

    return (
        <>
            {message.type!= "" && (
                <Alert type={message.type} message={message.msg} />
            )}

            {/* Add button */}
            <FloatButton
                onClick={handleOnAdd}
                title="Add Expense"
                className="bg-green-500 text-black hover:bg-green-400"
            />

            <SearchForm onSearch={handleOnSearch} />
            {loading && <LoadingIcon />}

            <div className="mx-2">
                <ExpenseList
                    data={data}
                    itemOnShowEditForm={(item) => handleOnEdit(item)}
                    itemOnDelete={(item) => handleOnDelete(item)}
                />
            </div>
            
            <Modal isVisible={showForm}>
                <div className="bg-white flex flex-col rounded-2xl shadow-md space-y-4 max-w-xl mx-auto">
                    {/* Header */}
                    <div className="bg-slate-100 text-blue-700 font-semibold text-lg px-6 py-3 rounded-t-2xl border-b border-blue-100 flex items-center justify-between">
                        <div>
                            {selectedExpense ? 'Edit Expense' : 'Add Expense'}
                        </div>
                        <div
                            onClick={() => setShowForm(false)}
                            className="text-2xl cursor-pointer text-red-500 font-bold hover:text-red-700 transition-colors duration-200"
                            title="Close"
                        >
                            &times;
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-6">
                        <ExpenseForm onSaved={handleOnSaved} data={selectedExpense} />
                    </div>
                </div>
            </Modal>

        </>
    );
}
