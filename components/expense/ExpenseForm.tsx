/** Form component for setting or updating the user's expense */

'use client';
import { ICategory, IExpense, IMessage, JSONObject } from '@/libs/definations';
import React, { useEffect, useState } from 'react';
import * as Utils from '@/utils';
import DateField from '../basics/DateField';
import Alert from '../basics/Alert';
import * as Constant from '@/libs/constants';
import { useMainUi } from '@/contexts/MainUiContext';
import { useCategory } from '@/contexts/CategoryContext';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import Joi, { date } from 'joi';
import { getCategoriesFromMap } from '@/utils/categoryUtil';
import { ExpenseService } from '@/services/expenseService';
import { useAuth } from '@/contexts/AuthContext';
import Button from '../basics/Button';

const expenseSchema = Joi.object({
    amount: Joi.number()
        .precision(2) // at most 2 decimal places
        .positive()
        .required()
        .messages({
            'number.base': 'Amount must be a number',
            'number.positive': 'Amount must be greater than zero',
            'number.precision': 'Account can have at most 2 decimal places',
            'any.required': 'Amount is required'
        }),
    category: Joi.string().empty('').required().messages({
        'any.required': 'Category is required'
    }),
    date: Joi.string().isoDate().empty('').required().messages({
        'date.base': 'Date must be a date',
        'string.empty': 'Date is required',
        'any.required': 'Date is required'
    })
});

export default function ExpenseForm({
    data,
    onSaved
}: {
    data?: IExpense | null;
    onSaved: (item) => void;
}) {
    const { user } = useAuth();
    const { categoryMap } = useCategory();

    const [formData, setFormData] = useState<IExpense>(
        data || ExpenseService.createEmptyExpense(user!.id)
    );
    const [messages, setMessages] = useState<JSONObject>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = expenseSchema.validate(
            {
                amount: formData.amount,
                category: formData.category,
                date: formData.date
            },
            { abortEarly: false }
        );

        if (error) {
            const newErrors = {};
            error.details.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });

            setMessages(newErrors);
        } else {
            setMessages({});

            const response = await ExpenseService.save(formData);
            if (response.success) {
                setMessages({ savedSuccess: 'Data is saved !' });
                onSaved(response.data);
            } else {
                setMessages({ savedError: response.message });
            }
        }

        return false;
    };

    const handleChange = (name: string, value: string | Number) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Validate this field immediately
        const errorMessage = validateField(name, value);
        setMessages((prev) => ({
            ...prev,
            [name]: errorMessage || undefined
        }));
    };

    const validateField = (fieldName: string, value: any) => {
        const schemaKeys = Object.keys(
            (expenseSchema as any).$_terms.keys ?? {}
        );

        if (schemaKeys.includes(fieldName)) {
            const fieldSchema = expenseSchema.extract(fieldName);
            const { error } = fieldSchema.validate(value, { abortEarly: true });
            return error ? error.details[0].message : null;
        }

        return null;
    };

    return (
        <>
            {messages.savedError && (
                <Alert
                    type={Constant.ALERT_TYPE_ERROR}
                    message={messages.savedError}
                />
            )}
            {messages.savedSuccess && (
                <Alert
                    type={Constant.ALERT_TYPE_SUCCESS}
                    message={messages.savedSuccess}
                />
            )}

            <form
                className="space-y-6 w-full mx-auto bg-white"
                onSubmit={handleSubmit}
            >
                <div>
                    <label
                        className="block font-medium text-gray-700 mb-1"
                        htmlFor="amount"
                    >
                        Amount <span className="text-red-600 ml-1">*</span>
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={formData.amount}
                        onChange={(e) =>
                            handleChange('amount', Number(e.target.value))
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {messages.amount && (
                        <p className="text-sm italic text-red-500">
                            {messages.amount}
                        </p>
                    )}
                </div>

                <div>
                   <label
                        className="block font-medium text-gray-700 mb-1"
                        htmlFor="category"
                    >
                        Category <span className="text-red-600 ml-1">*</span>
                    </label>
                    <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                            handleChange('category', e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">[Please select]</option>
                        {getCategoriesFromMap(categoryMap).map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {messages.category && (
                        <p className="text-sm italic text-red-500">
                            {messages.category}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        className="block font-medium text-gray-700 mb-1"
                        htmlFor="date"
                    >
                        Date <span className="text-red-600 ml-1">*</span>
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={Utils.formatDateForInput(formData.date)}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {messages.date && (
                        <p className="text-sm italic text-red-500">
                            {messages.date}
                        </p>
                    )}
                </div>

                <div>
                   <label
                        className="block font-medium text-gray-700 mb-1"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                            handleChange('description', e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className='text-right'>
                    <Button
                        title={data?.id ? 'Update' : 'Create'}
                        type="submit"
                    />
                </div>
            </form>
        </>
    );
}
