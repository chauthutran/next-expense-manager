import Link from 'next/link';
import LoginForm from './LoginForm';

export default function LoginPage() {
    return (
        <div className="flex p-10 justify-center bg-slate-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                {/* Logo / Title */}
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
                    Welcome, please sign in
                </h2>

                {/* Form */}
                <LoginForm />

                {/* Extra Links */}
                <div className="mt-6 flex justify-between text-sm">
                    <Link
                        href="/pages/register"
                        className="text-gray-400 hover:underline"
                    >
                        Create an account
                    </Link>
                    <Link
                        href="/pages/forgot-password"
                        className="text-gray-400 hover:underline"
                    >
                        Forgot / Change Password?
                    </Link>
                </div>
            </div>
        </div>
    );
}
