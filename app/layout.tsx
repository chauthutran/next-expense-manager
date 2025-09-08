import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppWrapper from '@/components/AppWrapper';
import RouterLoader from '@/components/RouterLoader';
import AppApolloProvider from './AppApolloProvider';
import RouterObserver from '@/components/RouterObserver';

const inter = Inter({ subsets: ['latin'] });

// Define the metadata for the app
export const metadata: Metadata = {
    title: 'Expense Management Application',
    description: 'Expense Management Application',
    themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
    generator: 'Next.js',
    manifest: '/manifest.json',
    keywords: ['nextjs', 'next14', 'pwa', 'next-pwa'],
    viewport:
        'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
    icons: [
        { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
        { rel: 'icon', url: 'icons/icon-128x128.png' }
    ]
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en-us">
            <body>
                <RouterObserver />

                <AppWrapper>
                    <RouterLoader />  {/*  RxJS - listens once and broadcasts everywhere */}
                    <div className={`flex flex-col ${inter.className}`}>
                        {children}
                    </div>
                </AppWrapper>
            </body>
        </html>
    );
}
