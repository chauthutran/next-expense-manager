import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { useAuth } from '@/contexts/AuthContext';
import userEvent from '@testing-library/user-event'
import { redirect, useRouter } from 'next/navigation';

jest.mock('@/contexts/AuthContext');
jest.mock('next/navigation');

const mockRegister = jest.fn();
const mockPush = jest.fn();

describe('RegisterForm', () => {
    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
            user: null,
            register: mockRegister,
            loading: false,
            error: null
        });
        
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush
        })
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    })
    
    it('renders email, password, confirmPassword and buttons', () => {
        render(<RegisterForm />);
        
        expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register button/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel button/i })).toBeInTheDocument();
    });
    
    it("shows error if email is invalid", async () => {
        render(<RegisterForm />);
        
        const emailTag = screen.getByPlaceholderText(/Enter your email/i);
        await userEvent.clear(emailTag);
        await userEvent.type(emailTag, "invalid-email");
        
        const form = screen.getByRole("form", { name: "register form"});
        fireEvent.submit(form);
        
        expect(emailTag).toHaveValue('invalid-email');
        await waitFor(() => {
            expect(
                screen.getByText(/Email must be a valid email/i)
            ).toBeInTheDocument();
        });
    });
    
    it("show error if password is too short", async () => {
        render(<RegisterForm />);
        
        const passwordTag = screen.getByPlaceholderText(/Enter your password/i);
        await userEvent.clear(passwordTag);
        await userEvent.type(passwordTag, "123");
        
        const form = screen.getByRole("form", {name: "register form"});
        fireEvent.submit(form);
        
        expect(passwordTag).toHaveValue("123");
        await waitFor(() => {
            expect(screen.getByText(/Password must be at least 4 characters/i)).toBeInTheDocument();
        });
    });
    
    it("shows error if password and confirmed pasword are not match", async () => {
        render(<RegisterForm />);
        
        const passwordTag = screen.getByPlaceholderText(/Enter your password/i);
        const confirmedPasswordTag = screen.getByPlaceholderText(/Confirm Password/i);
        const form = screen.getByRole("form", {name: "register form"});
        
        await userEvent.clear(passwordTag);
        await userEvent.type(passwordTag, "1234");
        
        await userEvent.clear(confirmedPasswordTag);
        await userEvent.type(confirmedPasswordTag, "12345");
        
        fireEvent.submit(form);
        
        expect(screen.getByText(/Confirm password must match password/i)).toBeInTheDocument();
    });
    
    it("calls register if the form is valid", async () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: {id: "123"},
            register: mockRegister,
            loading: false,
            error: null
        });
        
        render(<RegisterForm />);
        
        const emailTag = screen.getByPlaceholderText(/Enter your email/i);
        const passwordTag = screen.getByPlaceholderText(/Enter your password/i);
        const confirmedPasswordTag = screen.getByPlaceholderText(/Confirm Password/i);
        const form = screen.getByRole("form", {name: "register form"});
        
        await userEvent.clear(emailTag);
        await userEvent.type(emailTag, "test@example.com");
        
        await userEvent.clear(passwordTag);
        await userEvent.type(passwordTag, "1234");
        
        await userEvent.clear(confirmedPasswordTag);
        await userEvent.type(confirmedPasswordTag, "1234");
        
        fireEvent.submit(form);
        
        expect(emailTag).toHaveValue("test@example.com");
        expect(passwordTag).toHaveValue("1234");
        expect(confirmedPasswordTag).toHaveValue("1234");
        expect(mockRegister).toHaveBeenCalled();
    });
    
    it("shows loading spinner when loading is true", async () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: null,
            register: mockRegister,
            loading: true,
            error: null
        });
        
        render(<RegisterForm />);
        
        const spinner = await screen.findByLabelText('register loading spinner');
        expect(spinner).toBeInTheDocument();
    });
    
    it("shows error message from the context", async () => {
        (useAuth as jest.Mock).mockReturnValue({
            user: null,
            register: mockRegister,
            loading: true,
            error: "Something wrong occurred"
        });
        
        render(<RegisterForm />);
        
        expect(
            screen.getByText('Something wrong occurred')
        ).toBeInTheDocument();
    });
    
    it("redirect if user is registered", async () => {
         (useAuth as jest.Mock).mockReturnValue({
            user: { is: "123" },
            register: mockRegister,
            loading: false,
            error: null
        });
        
        render(<RegisterForm />);
        
        await userEvent.click(screen.getByRole("button", {name: "register button"}));
        
        expect(mockPush).toHaveBeenCalledWith('/pages/dashboard');
    });
    
    it("redirect if Cancel button is clicked", async () => {
         (useAuth as jest.Mock).mockReturnValue({
            user: null,
            register: mockRegister,
            loading: false,
            error: null
        });
        
        render(<RegisterForm />);
        
        await userEvent.click(screen.getByRole("button", {name: "cancel button"}));
        
        expect(mockPush).toHaveBeenCalledWith('/');
    });
});
