/** The login page for user authentication. Contains the LoginForm component. */

'use client';

import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import { useAuth } from '@/contexts/AuthContext';
import Joi from 'joi';
import { IUser, JSONObject } from '@/libs/definations';
import { useRouter } from 'next/navigation';

const registerSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .empty('') // treat empty string as empty value
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
        }),
    confirmPassword: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .label('Confirm Password') // helps Joi associate the error with the correct key and display the label nicely.
        .messages({
            'any.only': 'Confirm password must match password',
            'any.required': 'Confirm password is required'
        })
});

export default function RegisterForm() {
    const router = useRouter();
    const { loading, error, user, register } = useAuth();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<JSONObject>({});

    useEffect(() => {
        if (user != null) {
            if (user != null) {
                router.push('/pages/dashboard');
            }
        }
    }, [user]);

    const handleRegisterBtn = (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = registerSchema.validate(
            { email, password, confirmPassword },
            { abortEarly: false }
        );

        if (error) {
            const newErrors = {};
            error.details.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
        } else {
            register({ email, password } as IUser);
        }

        return false;
    };

    const handleOnCancel = () => {
        router.push('/');
    };

    return (
        <form className="space-y-5" onSubmit={handleRegisterBtn}>
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                            outline-none transition"
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    minLength={4}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                    <p className="text-sm italic text-red-500">
                        {errors.email}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     outline-none transition"
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    required
                    minLength={4}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                    <p className="text-sm italic text-red-500">
                        {errors.password}
                    </p>
                )}
            </div>

            <div>
                <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="confirmPassword"
                >
                    Confirm Password
                </label>
                <input
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     outline-none transition"
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {errors.confirmPassword && (
                    <p className="text-sm italic text-red-500">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            <div className="mb-4 flex space-x-5">
                <button
                    type="submit"
                    className="flex w-full p-2 rounded-lg 
                   bg-blue-600 text-white font-medium 
                   hover:bg-blue-700 active:bg-blue-800
                   transition shadow-sm"
                >
                    <span className="flex-1">Register</span>
                    {loading && (
                        <FaSpinner
                            className="ml-auto h-5 animate-spin"
                            size={20}
                        />
                    )}
                </button>
                <button
                    className="flex w-full p-2 rounded-lg 
                   bg-gray-300 text-gray-700 font-medium 
                   hover:bg-gray-400 active:bg-gray-500
                   transition shadow-sm"
                    onClick={handleOnCancel}
                >
                    <span className="flex-1">Cancel</span>
                </button>
            </div>

            <div className="flex h-8 items-end space-x-1 text-sm italic text-red-500">
                {error != null && <p>{error}</p>}
            </div>
        </form>
    );
}
