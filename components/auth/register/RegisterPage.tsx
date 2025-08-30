import Link from 'next/link';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
    return (
        <div className="flex p-10 justify-center bg-slate-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                {/* Logo / Title */}
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
                    Register
                </h2>
                
                <RegisterForm />
            </div>
        </div>
    );
}
