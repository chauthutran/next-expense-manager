import { useAuth } from '@/contexts/AuthContext';
import { useCategory } from '@/contexts/CategoryContext';
import { IBudget, ICategory, JSONObject } from '@/libs/definations';
import { BudgetService } from '@/services/budgetService';
import Joi from 'joi';
import { useState } from 'react';
import Alert from '../basics/Alert';
import * as Constant from '@/libs/constants';
import { getCategoriesFromMap } from '@/utils/categoryUtil';
import Button from '../basics/Button';
import { formatDateForInput } from '@/utils';

const budgetValidationSchema = Joi.object({
    name: Joi.string().empty('').required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    startDate: Joi.string().isoDate().empty('').required().messages({
        'string.base': 'Start date is a valid ISO date',
        'string.isoDate': 'Start date must be a valid ISO date',
        'string.empty': 'Start date is required',
        'any.required': 'Start date is required'
    }),
    endDate: Joi.string().isoDate().empty('').required().messages({
        'string.base': 'End date is a valid ISO date',
        'string.isoDate': 'End date must be a valid ISO date',
        'string.empty': 'Start date is required',
        'any.required': 'End date is required'
    }),
    totalLimit: Joi.number().empty('').required().messages({
        'number.base': 'Total limit must be a number',
        'string.empty': 'Total limit is required',
        'any.required': 'Total limit is required'
    }),
    category: Joi.string().empty('').required().messages({
        'string.base': 'Category must be a string',
        'string.empty': 'Category is required',
        'any.required': 'Category is required'
    })
});

export default function BudgetForm({
    data,
    onSaved
}: {
    data?: IBudget | null;
    onSaved: (item) => void;
}) {
    const { user } = useAuth();
    const { categoryMap } = useCategory();

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<JSONObject>({});
    const [formData, setFormData] = useState<IBudget>(
        data || BudgetService.createEmptyBudget(user!.id)
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = budgetValidationSchema.validate(
            {
                name: formData.name,
                startDate: formData.startDate,
                endDate: formData.endDate,
                totalLimit: formData.totalLimit,
                category: formData.category
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
            try {
                const response = await BudgetService.save(formData);
                if (response.success) {
                    setMessages({ savedSuccess: 'The budget is saved !' });
                    onSaved(response.data);
                } else {
                    setMessages({ savedError: response.message });
                }
            } catch (ex) {
                console.log(ex.message);
            }
        }

        return;
    };

    const validateField = (fieldName: string, value: any) => {
        const fieldSchema = budgetValidationSchema.extract(fieldName);
        const { error } = fieldSchema.validate(value, { abortEarly: true });
        return error ? error.details[0].message : null;
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
                onSubmit={handleSubmit}
                className="space-y-6 max-w-3xl mx-auto bg-white"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                handleChange('name', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {messages.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {messages.name}
                            </p>
                        )}
                    </div>

                    {/* Total Limit */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Total Limit
                        </label>
                        <input
                            type="number"
                            value={formData.totalLimit}
                            onChange={(e) =>
                                handleChange(
                                    'totalLimit',
                                    Number(e.target.value)
                                )
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {messages.totalLimit && (
                            <p className="text-red-500 text-sm mt-1">
                                {messages.totalLimit}
                            </p>
                        )}
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={formatDateForInput(formData.startDate)}
                            onChange={(e) =>
                                handleChange('startDate', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {messages.startDate && (
                            <p className="text-red-500 text-sm mt-1">
                                {messages.startDate}
                            </p>
                        )}
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={formatDateForInput(formData.endDate)}
                            onChange={(e) =>
                                handleChange('endDate', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {messages.endDate && (
                            <p className="text-red-500 text-sm mt-1">
                                {messages.endDate}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="sm:col-span-2">
                        <label className="block font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
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
                            <p className="text-red-500 text-sm mt-1">
                                {messages.category}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2">
                        <label className="block font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                handleChange('description', e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={4}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <Button
                        title={data?.id ? 'Update Budget' : 'Create Budget'}
                        type="submit"
                    />
                </div>
            </form>
        </>
    );
}
