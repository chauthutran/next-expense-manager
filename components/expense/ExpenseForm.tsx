/** Form component for setting or updating the user's expense */

'use client';
import { ICategory, IExpense, JSONObject } from '@/libs/definations';
import React, { useEffect, useState } from 'react';
import * as Utils from '@/utils';
import DateField from '../basics/DateField';
import Alert from '../basics/Alert';
import * as Constant from '@/libs/constants';
import { useMainUi } from '@/contexts/MainUiContext';
import { useCategory } from '@/contexts/CategoryContext';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillHome } from 'react-icons/ai';
import Joi from 'joi';
import { getCategoriesFromMap } from '@/utils/categoryUtil';
import { ExpenseService } from '@/services/expenseService';
import { useAuth } from '@/contexts/AuthContext';

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
    categoryId: Joi.string().empty('').required().messages({
        'any.required': 'Category is required'
    }),
    date: Joi.date().required().messages({
        'date.base': 'Date must be a date',
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
    const { setSubPage } = useMainUi();
    const { user } = useAuth();
    const { categoryMap } = useCategory();

    const [formData, setFormData] = useState<IExpense>(data || ExpenseService.createEmptyExpense(user!.id));
    const [continueCreateNew, setContinueCreateNew] = useState(false);
    const [errors, setErrors] = useState<JSONObject>({});
    const [messages, setMessages] = useState<JSONObject>({});

    // useEffect(() => {
    //     if (processingStatus === Constant.SAVE_EXPENSE_SUCCESS) {
    //         if (continueCreateNew) {
    //             handleOnReset();
    //         } else {
    //             setProcessingStatus('');
    //             setSubPage(null);
    //         }
    //     }
    // }, [processingStatus]);

    // const setValue = (propName: string, value: string | Date | null) => {
    //     var tempData = Utils.cloneJSONObject(expense);
    //     if (value == null || value == '') {
    //         delete tempData[propName];
    //     } else if (value instanceof Date) {
    //         tempData[propName] = Utils.formatDateObjToDbDate(value);
    //     } else {
    //         tempData[propName] = value;
    //     }

    //     setExpense(tempData);
    // };

    const handleOnSave = (
        event: React.MouseEvent<HTMLButtonElement>,
        isContinue: boolean
    ) => {
        event.preventDefault();

        const { error } = expenseSchema.validate(
            {
                amount: formData.amount,
                categoryId: formData.category,
                date: formData.date
            },
            { abortEarly: false }
        );

        if (error) {
            const newErrors = {};
            error.details.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });

            setErrors(newErrors);
        } else {
            // expense.user = userId;
            // setContinueCreateNew(isContinue);

            // saveExpense(expense);
        }
    };

    const handleOnReset = () => {
        setFormData(data || ExpenseService.createEmptyExpense(user!.id));
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
        const fieldSchema = expenseSchema.extract(fieldName);
        const { error } = fieldSchema.validate(value, { abortEarly: true });
        return error ? error.details[0].message : null;
    };
    
    return (
        <div className="overflow-x-auto ">
            <div className="flex items-center justify-center">
                <div className="flex-1 px-3 my-2 py-2 rounded border border-gray-300 max-w-xl">
                    <div>
                        <div className="mb-2">
                            <label
                                className="block text-gray-700 mb-2"
                                htmlFor="amount"
                            >
                                Amount{' '}
                                <span className="text-red-600 ml-1">*</span>
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={formData.amount}
                                onChange={(e) =>
                                    handleChange('amount', e.target.value)
                                }
                            
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.amount && (
                                <p className="text-sm italic text-red-500">
                                    {errors.amount}
                                </p>
                            )}
                        </div>

                        <div className="mb-2">
                            <label
                                className="block text-gray-700 mb-2"
                                htmlFor="category"
                            >
                                Category{' '}
                                <span className="text-red-600 ml-1">*</span>
                            </label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) =>
                                    handleChange('category', e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">[Please select]</option>
                                {getCategoriesFromMap(categoryMap).map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <p className="text-sm italic text-red-500">
                                    {errors.categoryId}
                                </p>
                            )}
                        </div>

                        <div className="mb-2">
                            <label
                                className="block text-gray-700 mb-2"
                                htmlFor="date"
                            >
                                Date{' '}
                                <span className="text-red-600 ml-1">*</span>
                            </label>
                            <DateField
                                id="date"
                                value={Utils.formatDateForInput(formData.date)}
                                onChange={(e) =>
                                    handleChange('startDate', e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded"
                            />

                            {errors.date && (
                                <p className="text-sm italic text-red-500">
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        <div className="mb-2">
                            <label
                                className="block text-gray-700 mb-2"
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
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-x-3">
                            <button
                                type="submit"
                                className="bg-mint-green px-4 py-2 rounded hover:bg-green-300"
                                onClick={(e) => handleOnSave(e, false)}
                            >
                                Save & Go back
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-greeny px-4 py-2 rounded hover:bg-teal-400"
                                onClick={(e) => handleOnSave(e, true)}
                            >
                                Save & Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
