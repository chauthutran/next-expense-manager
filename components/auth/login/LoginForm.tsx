/** The login page for user authentication. Contains the LoginForm component. */

'use client';

import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import Joi from 'joi';
import { JSONObject } from '@/libs/definations';
import { useRouter } from 'next/navigation';
import useFormValidation from '@/hooks/useFormValidation';

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .empty('') // treat empty string as empty value. Tells Joi that empty string should be considered as "empty" and thus invalid.
        .required()
        .messages({
            'string.base': 'Email is invalid',
            'string.email': 'Email must be a valid email',
            'any.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .empty('') // treat empty string as empty value
        .min(4)
        .required()
        .messages({
            'string.min': 'Password must be at least 4 characters',
            'any.empty': 'Email is required',
            'any.required': 'Password is required'
        })
});

export default function LoginForm() {
    const { user, login, loading, error } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('test1@gmail.com');
    const [password, setPassword] = useState('1234');
    const { errors, validateForm } = useFormValidation(loginSchema);

    useEffect(() => {
        if (user != null) {
            router.push('/pages/dashboard');
        }
    }, [user]);

    const handleLoginBtn = (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm({ email, password });
        if (isValid) {
            login(email, password);
        }

        return false;
    };

    return (
        <form
            aria-label="login form"
            className="space-y-5"
            onSubmit={handleLoginBtn}
        >
            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     outline-none transition"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                {errors.email && (
                    <p className="text-sm italic text-red-500">
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     outline-none transition"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                {errors.password && (
                    <p className="text-sm italic text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>

            {/* Button */}
            <button
                type="submit"
                className="flex w-full p-2 rounded-lg 
                   bg-blue-600 text-white font-medium 
                   hover:bg-blue-700 active:bg-blue-800
                   transition shadow-sm"
            >
                <span className="flex-1">Login</span>
                {loading && (
                    <FaSpinner
                        aria-label="login button"
                        className="ml-auto h-5 animate-spin"
                        size={20}
                    />
                )}
            </button>
            <div className="flex h-8 items-end space-x-1 text-sm italic text-red-500">
                {error != null && <p>{error}</p>}
            </div>
        </form>
    );
}
