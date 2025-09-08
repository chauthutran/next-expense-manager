'use client';

import { routerSubject } from "@/libs/routerSubject";
import { usePathname } from "next/navigation"
import { useEffect } from "react";

export default function RouterObserver() {
    const pathname = usePathname();
    
    useEffect(() => {
        if(pathname) {
            routerSubject.next(pathname); // push route into RxJS stream
        }
    }, [pathname]);
    
    return null;
}