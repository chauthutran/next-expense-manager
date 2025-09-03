import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import userEvent from '@testing-library/user-event';

jest.mock('@/contexts/AuthContext');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

const mockLogin = jest.fn();
const mockPush = jest.fn();

describe('LoginForm', () => {
    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
            user: null,
            login: mockLogin,
            loading: false,
            error: null
        });

        // Cast useRouter to jest.Mock
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders email, password inputs and login button', () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/Enter your email/i)
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/Enter password/i)
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Login/i })
        ).toBeInTheDocument();
    });

    it('shows error if email is invalid', async () => {
        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText(/Enter your email/i);

        // Clear default and type invalid email
        await userEvent.clear(emailInput);
        await userEvent.type(emailInput, 'invalid-email');

        // Click login button
        const form = screen.getByRole('form', { name: /login form/i });
        fireEvent.submit(form);

        // Input has the typed value
        expect(emailInput).toHaveValue('invalid-email');

        // Wait for the validation error to appear
        await waitFor(() => {
            expect(
                screen.getByText(/Email must be a valid email/i)
            ).toBeInTheDocument();
        });

        // Login function should not be called
        expect(mockLogin).not.toHaveBeenCalled();
    });

    it('shows error if password is too short', async () => {
        render(<LoginForm />);

        const passwordInput = screen.getByPlaceholderText(/Enter password/i);

        // Clear default and type invalid password
        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, '123');

        // Click login button
        const form = screen.getByRole('form', { name: /login form/i });
        fireEvent.submit(form);

        // Input has the typed value
        expect(passwordInput).toHaveValue('123');

        // Wait for the validation error to appear
        await waitFor(() => {
            expect(
                screen.getByText(/Password must be at least 4 characters/i)
            ).toBeInTheDocument();
        });

        // Login function should not be called
        expect(mockLogin).not.toHaveBeenCalled();
    });

    it('calls login if the form is valid', async () => {
        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText(/Enter your email/i);
        const passwordInput = screen.getByPlaceholderText(/Enter password/i);

        // Clear default and type invalid email
        await userEvent.clear(emailInput);
        await userEvent.type(emailInput, 'test@example.com');
        // Clear default and type invalid password
        await userEvent.clear(passwordInput);
        await userEvent.type(passwordInput, '1234');

        // Click login button
        const form = screen.getByRole('form', { name: /login form/i });
        fireEvent.submit(form);

        // Input has the typed value
        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('1234');

        // Login function should not be called
        expect(mockLogin).toHaveBeenCalled();
    });

    it('shows spinner when loading is true', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: null,
            login: mockLogin,
            loading: true,
            error: null
        });

        render(<LoginForm />);

        const spinner = await screen.findByLabelText('login button');
        expect(spinner).toBeInTheDocument();
    });

    it('shows error message from context', () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: null,
            login: mockLogin,
            loading: true,
            error: 'Something wrong occurred'
        });

        render(<LoginForm />);
        expect(
            screen.getByText('Something wrong occurred')
        ).toBeInTheDocument();
    });

    it('redirects if user is existed', () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: { id: 'user_id_1' },
            login: mockLogin,
            loading: true,
            error: null
        });

        render(<LoginForm />);
        expect(mockPush).toHaveBeenCalledWith('/pages/dashboard');
    });
});
