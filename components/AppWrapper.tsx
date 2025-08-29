'use client';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import { CategoryProvider } from '@/contexts/CategoryContext';
import usePWAInstallPrompt from '@/pwa/hook/PWAInstallPromptHook';
import InstallPrompt from '@/pwa/InstallPrompt';
import PushNotificationManager from '@/pwa/PushNotificationManager';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SlideBar from './layout/SlideBar';
import AppApolloProvider from '@/app/AppApolloProvider';

export default function AppWrapper({
    children
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isOffline, setIsOffline] = useState<boolean>(false);
    const [openSlideBar, setOpenSlideBar] = useState(false);

    // Hide sliderBar in LoginPage route
    const hideSidebar = pathname === '/';

    useEffect(() => {
        const handleOffline = () => {
            setIsOffline(true);
        };

        const handleOnline = () => {
            setIsOffline(false);
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    usePWAInstallPrompt();

    return (
        <>
            {isOffline && (
                <p>You are offline. Some features may not be available.</p>
            )}

            <div>
                <PushNotificationManager />
                <InstallPrompt />
            </div>

            <AppApolloProvider>
                <AuthProvider>
                    <CategoryProvider>
                        <div className="flex flex-col min-h-screen">
                            <Header
                                handleOpenSlideBar={() => setOpenSlideBar(true)}
                            />
                            {!hideSidebar && (
                                <SlideBar
                                    isOpen={openSlideBar}
                                    onClose={() => setOpenSlideBar(false)}
                                />
                            )}
                            <main className="flex-1">{children}</main>

                            <Footer />
                        </div>
                    </CategoryProvider>
                </AuthProvider>
            </AppApolloProvider>
        </>
    );
}
