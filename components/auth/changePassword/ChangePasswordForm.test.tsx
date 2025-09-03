import { UserService } from '@/services/userService';
import LoginForm from '../login/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';
import ChangePasswordForm from './ChangePasswordForm';
import userEvent from '@testing-library/user-event';
import { useAuth } from '@/contexts/AuthContext';

const mockChangePassword = jest.fn();

// Mock UserService
jest.mock('@/services/userService', () => ({
    UserService: {
        requestToResetPassword: jest.fn()
    }
}));

jest.mock('@/contexts/AuthContext', () => ({
    useAuth: jest.fn()
}));

describe('ForgetPasswordForm', () => {
    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
            user: { id: '123' },
            changePassword: mockChangePassword,
            loading: false,
            error: null
        });

        mockChangePassword.mockResolvedValue({
            success: true,
            data: { id: '123' },
            message: ''
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders current password and new password', () => {
        render(<ChangePasswordForm />);

        const currentPasswordInput = screen.getByPlaceholderText(
            /Enter current password/i
        );
        const newPasswordInput =
            screen.getByPlaceholderText(/Enter new password/i);
        const confirmNewPasswordInput = screen.getByPlaceholderText(
            /Enter confirm new password/i
        );

        expect(currentPasswordInput).toBeInTheDocument();
        expect(newPasswordInput).toBeInTheDocument();
        expect(confirmNewPasswordInput).toBeInTheDocument();
    });

    it('show error if current password is too short', async () => {
        render(<ChangePasswordForm />);

        const currentPasswordInput = screen.getByPlaceholderText(
            /Enter current password/i
        );

        await userEvent.clear(currentPasswordInput);
        await userEvent.type(currentPasswordInput, '123');

        // const form = screen.getByRole('form', { name: 'change password form' });
        // fireEvent.submit(form);

        expect(
            screen.getByText(/Password must be at least 4 characters/i)
        ).toBeInTheDocument();
    });

    it('show error if confirm new password is not matched', async () => {
        render(<ChangePasswordForm />);

        const newPasswordInput =
            screen.getByPlaceholderText(/Enter new password/i);
        const confirmNewPasswordInput = screen.getByPlaceholderText(
            /Enter confirm new password/i
        );

        await userEvent.clear(newPasswordInput);
        await userEvent.type(newPasswordInput, '1234');

        await userEvent.clear(confirmNewPasswordInput);
        await userEvent.type(confirmNewPasswordInput, '5678');

        expect(
            screen.getByText(/Confirm new password must match password/i)
        ).toBeInTheDocument();
    });

    it('changes password if form is valid', async () => {
        render(<ChangePasswordForm />);

        const currentPasswordInput = screen.getByPlaceholderText(
            /Enter current password/i
        );
        const newPasswordInput =
            screen.getByPlaceholderText(/Enter new password/i);
        const confirmNewPasswordInput = screen.getByPlaceholderText(
            /Enter confirm new password/i
        );

        await userEvent.clear(currentPasswordInput);
        await userEvent.type(currentPasswordInput, '1234');

        await userEvent.clear(newPasswordInput);
        await userEvent.type(newPasswordInput, '5678');

        await userEvent.clear(confirmNewPasswordInput);
        await userEvent.type(confirmNewPasswordInput, '5678');

        const form = screen.getByRole('form', { name: 'change password form' });
        expect(form).toBeInTheDocument();

        await fireEvent.submit(form);

        expect(mockChangePassword).toHaveBeenCalled();
    });
});
