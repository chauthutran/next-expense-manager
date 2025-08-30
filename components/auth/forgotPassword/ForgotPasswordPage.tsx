import ForgotPasswordForm from './ForgetPasswordForm';

export default function ForgotPasswordPage() {
    return (
        <div className="flex p-10 justify-center bg-slate-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                {/* Logo / Title */}
                <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
                    Forgot Password
                </h2>

                <ForgotPasswordForm />
            </div>
        </div>
    );
}
