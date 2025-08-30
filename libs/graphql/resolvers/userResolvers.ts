import crypto from 'crypto';
import connectToDatabase from '@/libs/db';
import { JSONObject } from '@/libs/definations';
import User from '@/libs/schemas/User.schema';
import * as Encrypt from '@/libs/utils/encryptPassword';
import nodemailer from 'nodemailer';

export const userResolvers = {
    Query: {
        login: async (
            _: any,
            { email, password }: { email: string; password: string }
        ) => {
            await connectToDatabase();

            const searchResult = await User.find({ email });
            // Find the users with the password if there is password in parameters
            let matchedUser: Document | null = null;
            for (let i = 0; i < searchResult.length; i++) {
                const user = searchResult[i];
                const matched = await Encrypt.comparePassword(
                    password!,
                    user.password
                );
                if (matched) {
                    matchedUser = user;
                    break;
                }
            }

            return matchedUser;
        }
    },
    Mutation: {
        createUser: async (
            _: any,
            { email, password }: { email: string; password: string }
        ) => {
            await connectToDatabase(); // Ensure DB connection

            // Hash(encrypt) password before creating
            const hashPassword = await Encrypt.hashPassword(password);
            const newUser = await User.create({
                email,
                password: hashPassword
            });

            return newUser;
        },
        changePassword: async (
            _: any,
            { id, oldPassword, newPassword }: JSONObject
        ) => {
            await connectToDatabase();

            // 1. Find user by id
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }

            // 2. Verify old password
            const isMatch = await Encrypt.comparePassword(
                oldPassword,
                user.password
            );
            if (!isMatch) {
                throw new Error('Old password is incorrect');
            }

            // 3. Hash new password
            const hashedNewPassword = await Encrypt.hashPassword(newPassword);

            // 4. Update password
            user.password = hashedNewPassword;
            await user.save();

            return user;
        },
        requestToResetPassword: async (
            _: any,
            { email }: { email: string }
        ) => {
            // STEP 1: Create "Reset password token"
            const { resetPasswordToken, resetPasswordExpires } =
                createResetPasswordToken();

            // STEP 2. Check if email 'to' is existing
            const updatedUser = await User.findOneAndUpdate(
                { email },
                {
                    resetPasswordToken,
                    resetPasswordExpires
                },
                { new: true }
            );

            if (updatedUser) {
                // STEP 3. Send email
                const subject = "[Expense Management Application] Request to reset password";
                const text = `Please click on this link http://localhost:3000/pages/reset-password?token=${resetPasswordToken} to reset your password. \n Please don't reply this email.`
                    
                await sendEmail({ to: email, subject, text });
                return true;
            }
            return false;
        },
        deleteUser: async (_: any, { id }: { id: string }) => {
            await connectToDatabase();
            const deleted = await User.findByIdAndDelete(id);
            return !!deleted; // true if deleted, false if not found
        }
    }
};

const createResetPasswordToken = (): JSONObject => {
    const token = crypto.randomBytes(32).toString('hex');

    return {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000 // 1 hour,
    };
};

const sendEmail = async ({ to, subject, text }: {to: string, subject: string, text: string}) => {
    // Setup transporter (use your SMTP service, e.g., Gmail, Outlook, SendGrid, etc.)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or use "smtp.yourprovider.com"
        auth: {
            user: process.env.EMAIL_USER, // your email
            pass: process.env.EMAIL_PASS // app password
        }
    });

    // Send email
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject,
        text
    });
};
