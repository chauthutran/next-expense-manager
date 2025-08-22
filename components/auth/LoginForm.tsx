/** The login page for user authentication. Contains the LoginForm component. */

'use client';

import { CiUser } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import * as Constant from '@/libs/constants';
import { useMainUi } from '@/contexts/MainUiContext';
import { useAuth } from '@/contexts/AuthContext';
import Joi from 'joi';
import { JSONObject } from '@/libs/definations';
import { useRouter } from 'next/navigation';

const loginSchema = Joi.object({
    email: Joi.string()
        .empty('') // treat empty string as empty value. Tells Joi that empty string should be considered as "empty" and thus invalid.
        .required()
        .messages({
            'string.base': 'Email is invalid',
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
    const [errors, setErrors] = useState<JSONObject>({});

    useEffect(() => {
        if (user != null) {
			router.push("/pages/dashboard");
        }
    }, [user]);

    const handleLoginBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { error } = loginSchema.validate(
            { email, password },
            { abortEarly: false }
        );
        if (error) {
            const newErrors = {};
            error.details.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });

            setErrors(newErrors);
        } else {
            setErrors({});
            login(email, password);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <div className="mb-4">
                <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="email"
                >
                    Email
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></CiUser>
                </div>
                {errors.email && <p className="text-sm italic text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="password"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        required
                        minLength={4}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
                {errors.password && (
                    <p className="text-sm italic text-red-500">{errors.password}</p>
                )}
            </div>

            <div className="mb-4">
                <button
                    className="flex w-full flex-row bg-gold px-4 py-2 rounded hover:bg-yellow-300"
                    onClick={(e) => handleLoginBtn(e)}
                >
                    <span className="flex-1">Log in</span>
                    {loading && <FaSpinner className="ml-auto h-5" size={20} />}
                </button>
            </div>

            <div className="flex h-8 items-end space-x-1 text-sm italic text-red-500">
                {error != null && <p>{error}</p>}
            </div>
        </div>
    );
}
