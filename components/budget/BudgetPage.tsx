'use client';

import { BudgetService } from '@/services/budgetService';
import BudgetForm from './BudgetForm';
import SearchForm from '../layout/SearchForm';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { IBudget, IMessage, SearchFilters } from '@/libs/definations';
import BudgetList from './BudgetList';
import FloatButton from '../basics/FloatButton';
import Modal from '../basics/Modal';
import * as Constant from '@/libs/constants';
import Alert from '../basics/Alert';
import { createMessage } from '@/utils';
import LoadingIcon from '../basics/LoadingIcon';

export default function BudgetPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<IMessage>(createMessage());
    const [data, setData] = useState<IBudget[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<IBudget | null>(null);
    const [filters, setFilters] = useState<SearchFilters | null>(null); // keep last filters

    const fetchBudgets = async (_filters: SearchFilters) => {
        setLoading(true);
        const responseData = await BudgetService.findBudgets(_filters);
        if (responseData.success) {
            setData(responseData.data);
        } else {
            setMessage({
                type: Constant.ALERT_TYPE_ERROR,
                msg: responseData.message!
            });
        }
        setLoading(false);
    };

    const handleOnSearch = async (filters: SearchFilters) => {
        setMessage(createMessage());
        setFilters(filters);

        await fetchBudgets(filters);
    };

    const handleOnAdd = () => {
        setSelectedBudget(null);
        setShowForm(true);
    };
    const handleOnEdit = async (item: IBudget) => {
        setSelectedBudget(item);
        setShowForm(true);
    };

    const handleOnSaved = async () => {
        setShowForm(false);
        if (filters) {
            await handleOnSearch(filters); // Refresh the budget list with last filters
        }
    };

    const handleOnDelete = async (item: IBudget) => {
        const ok = confirm(
            `Are you sure you want to delete the budget "${item.name}" ?`
        );
        if (ok) {
            setLoading(true);
            const response = await BudgetService.delete(item.id!);
            if (response.success) {
                setLoading(false);
                setMessage({
                    type: Constant.ALERT_TYPE_SUCCESS,
                    msg: `The budget "${item.name}" is deleted !`
                });
                fetchBudgets(filters!);
            } else {
                setMessage({
                    type: Constant.ALERT_TYPE_ERROR,
                    msg: response.message!
                });
            }
        }
    };

    return (
        <>
            {message.type != '' && (
                <Alert type={message.type} message={message.msg} />
            )}

            {/* Add button */}
            <FloatButton
                onClick={handleOnAdd}
                title="Add Budget"
                className="bg-green-500 text-black hover:bg-green-400"
            />

            <SearchForm onSearch={handleOnSearch} />
            {loading && <LoadingIcon />}

            <div className="mx-2">
                <BudgetList
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
                            {selectedBudget ? 'Edit Budget' : 'Add Budget'}
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
                        <BudgetForm
                            onSaved={handleOnSaved}
                            data={selectedBudget}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
