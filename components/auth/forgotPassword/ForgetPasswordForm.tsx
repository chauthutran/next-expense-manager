import { JSONObject } from '@/libs/definations';
import { UserService } from '@/services/userService';
import Joi from 'joi';
import { useState } from 'react';

const forgotPasswordValidationSchema = Joi.object({
    email: Joi.string()
        .empty('')
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.base': 'Email is invalid',
            'string.email': 'Email must be a valid email',
            'any.empty': 'Email is required',
            'any.required': 'Email is required'
        })
});

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<JSONObject>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = forgotPasswordValidationSchema.validate(
            { email },
            { abortEarly: false }
        );
        if (error) {
            const newErrors: JSONObject = {};
            error.details.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });

            setErrors(newErrors);
        } else {
            UserService.requestToResetPassword(email);
            // Call your backend API to send reset link
            console.log('Request password reset for:', email);
            setSuccess(true);
        }
    };

    return (
        <>
            {!success ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="italic text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Send Reset Link
                    </button>
                </form>
            ) : (
                <p className="text-green-600 text-sm">
                    ✅ If an account exists with <b>{email}</b>, you’ll receive
                    an email with a reset link.
                </p>
            )}
        </>
    );
}
