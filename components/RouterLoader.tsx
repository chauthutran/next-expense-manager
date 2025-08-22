'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouterLoader() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    
    useEffect(() => {
        setLoading(true);
        
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500); // duration to show loader
        
        return () => clearTimeout(timeout);
    }, [pathname]);
    
    return loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="text-xl font-semibold">Loading...</div>
        </div>
    ) : null;
}