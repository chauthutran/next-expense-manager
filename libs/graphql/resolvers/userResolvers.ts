import connectToDatabase from '@/libs/db';
import { JSONObject } from '@/libs/definations';
import User from '@/libs/schemas/User.schema';
import * as Encrypt from '@/libs/utils/encryptPassword';

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
        deleteUser: async (_: any, { id }: { id: string }) => {
            await connectToDatabase();
            const deleted = await User.findByIdAndDelete(id);
            return !!deleted; // true if deleted, false if not found
        }
    }
};
