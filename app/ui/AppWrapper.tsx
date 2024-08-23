"use client";

import * as Constant from "@/lib/constants";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";
import ExpensePage from "./expense/ExpensePage";

export default function AppWrapper() {
    const { mainPage } = useMainUi();
    const { user } = useAuth();
    return (
        <>
            { mainPage == Constant.PAGE_LOGIN && <LoginForm /> }

            { mainPage == Constant.PAGE_USER_REGISTRATION && <RegisterForm /> }


            {user != null && <>
                { mainPage == Constant.PAGE_EXPENSE && <ExpensePage /> }
            </> }
        </>
    )
}