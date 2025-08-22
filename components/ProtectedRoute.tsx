'use client'

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const { user } = useAuth();
    
    useEffect(() => {
        if(!user) {
            router.replace("/");
        }
    }, [user, router]);
    
    if(!user) {
        return null;
    }
    
    return <>{children}</>
}