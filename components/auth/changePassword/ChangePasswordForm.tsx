import Alert from '@/components/basics/Alert';
import { useAuth } from '@/contexts/AuthContext';
import useFormValidation from '@/hooks/useFormValidation';
import { IMessage } from '@/libs/definations';
import { createMessage } from '@/libs/utils';
import Joi from 'joi';
import { ChangeEvent, useState } from 'react';

const changePasswordValidate = Joi.object({
    currentPassword: Joi.string()
        .empty('') // treat empty string as empty value
        .min(4)
        .required()
        .messages({
            'string.min': 'Password must be at least 4 characters',
            'any.empty': 'Email is required',
            'any.required': 'Password is required'
        }),
    newPassword: Joi.string()
        .empty('') // treat empty string as empty value
        .min(4)
        .required()
        .messages({
            'string.min': 'Password must be at least 4 characters',
            'any.empty': 'Email is required',
            'any.required': 'Password is required'
        }),
    confirmNewPassword: Joi.string()
        // .equal(Joi.ref('newPassword'))
        .valid(Joi.ref('newPassword')) // does not work for "validateField"
        // .custom((value, helpers) => {
        //     if (value !== helpers.state.ancestors[0].newPassword) {
        //       return helpers.error('any.only');
        //     }
        //     return value;
        //   })
        .required()
        .label('Confirm New Password') // helps Joi associate the error with the correct key and display the label nicely.
        .messages({
            'any.only': 'Confirm new password must match password',
            'any.required': 'Confirm password is required'
        })
});

export default function ChangePasswordForm() {
    const { user, changePassword, loading, error: registerErr } = useAuth();
    const { errors, validateForm, validateField } = useFormValidation(
        changePasswordValidate
    );
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState<IMessage>(createMessage());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("===== handleSubmit", handleSubmit);
        const isValid = validateForm({
            currentPassword,
            newPassword,
            confirmNewPassword
        });
        
        if (isValid) {
            const response = await changePassword({
                userId: user?.id,
                currentPassword,
                newPassword
            });
            if (response.success) {
                setMessage({ type: 'success', msg: 'Password is changed !' });
            } else {
                setMessage({ type: 'error', msg: response.message! });
            }
        }

        return false;
    };

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement>,
        setValueFunc: (value: string) => void
    ) => {
        const { name, value } = e.target;
        
        validateField(name, value);
        setValueFunc(value);
    };
    
    return (
        <>
            {/* the message here is for changing password request */}
            {message.msg !== '' && (
                <Alert type={message.type} message={message.msg} />
            )}

            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Change Password
                </h2>
                <form
                    onSubmit={handleSubmit}
                    aria-label="change password form"
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm text-gray-600">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            value={currentPassword}
                            placeholder="Enter current password"
                            onChange={(e) =>
                                handleOnChange(e, setCurrentPassword)
                            }
                        />
                        {errors.currentPassword && (
                            <p className="text-sm italic text-red-500">
                                {errors.currentPassword}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            value={newPassword}
                            placeholder="Enter new password"
                            onChange={(e) => handleOnChange(e, setNewPassword)}
                        />
                        {errors.newPassword && (
                            <p className="text-sm italic text-red-500">
                                {errors.newPassword}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            value={confirmNewPassword}
                            placeholder="Enter confirm new password"
                            onChange={(e) =>
                                handleOnChange(e, setConfirmNewPassword)
                            }
                        />
                        {errors.confirmNewPassword && (
                            <p className="text-sm italic text-red-500">
                                {errors.confirmNewPassword}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </>
    );
}
