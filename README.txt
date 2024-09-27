# Prepare database 
 # Create a Mongodb Atlat account ( mongodb.com )
 # Create file env.local with content:
    MONGODB_URI=<Mongodb-URI>
    This is an example for "Mongodb-URI": mongodb+srv://<username>:<passowrd>@cluster0.n0jz7.mongodb.net/personalfinance?retryWrites=true&w=majority&appName=Cluster0

## Getting Started
    [1]. Build the app
        ``` bash
        npm run build
    or 
        yarn build

[2]. Run the development server:
    ```bash
    npm run dev
# or
    yarn dev

###################################################
# URL: https://blog.avneesh.tech/how-to-create-a-pwa-with-nextjs
### Install a NextJS project with PWA ###
    #1. Install dependency
        > yarn add next-pwa
        > yarn add lighthouse chrome-launcher
        
            The next-pwa package provides a number of features that make it easy to create PWAs, including:
            - Service worker generation and registration
            - Caching
            - Offline support
            - Manifest file generation
            - Head meta tags

    #2. Set up nextjs.config.mjs
        `````````````````````````````````````
        // next.config.mjs
        import withPWA from 'next-pwa';

        /** @type {import('next').NextConfig} */
        const nextConfig = {
            reactStrictMode: true, // Enable React strict mode for improved error handling
            swcMinify: true, // Enable SWC minification for improved performance
            compiler: {
                removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
            }
        };

        export default withPWA({
            dest: "public",         // destination directory for the PWA files
            disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
            register: true,         // register the PWA service worker
            skipWaiting: true,      // skip waiting for service worker activation
        })(nextConfig);

        `````````````````````````````````````


    #3. In the folder “public”, create “manifest.json”
        `````````````````````````````````````
        {
            "name": "Expense Management App",
            "short_name": "expense_management",
            "description": "A progressive web app built with Next.js",
            "icons": [
            {
                "src": "/icons/expense-128x128.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": "/icons/expense-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
            ],
            "start_url": "/",
            "background_color": "#ffffff",
            "display": "standalone",
            "theme_color": "#000000",
            "orientation": "portrait",
            "scope": "/",
            "splash_pages": null
        }

        `````````````````````````````````````

    #4. Create the .env file and define the NODE_ENV as development.
        NODE_ENV=development

    #5. In folder “public”, create folder “icons”
        

    #6. Update the .gitignore file with this new code.

        `````````````````````````````````````
        #local env files
        .env

        # Auto Generated PWA files
        /public/sw.js
        /public/workbox-*.js

        `````````````````````````````````````

    #7. Add PWA Metadata in layout.tsx

        `````````````````````````````````````
        import type { Metadata } from "next";
        import { Inter } from "next/font/google";
        import "./globals.css";


        const inter = Inter({ subsets: ["latin"] });


        // Define the metadata for the app
        export const metadata: Metadata = {
        title: 'Expense Management Application',
        description: 'Expense Management Application',
        themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
        // themeColor: '#000000', // Set theme color for your PWA
        generator: "Next.js",
        manifest: "/manifest.json",
        keywords: ["nextjs", "next14", "pwa", "next-pwa"],
        authors: [
            {
            name: "imvinojanv",
            url: "https://www.linkedin.com/in/imvinojanv/",
            },
        ],
        viewport:
            "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
        icons: [
            { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
            { rel: "icon", url: "icons/icon-128x128.png" },
        ],
        };


        export default function RootLayout({
            children,
            }: Readonly<{
            children: React.ReactNode;
            }>) {
            return (
                <html lang="en-us">
                <head>
                    {/* Link to the manifest */}
                    <link rel="manifest" href="/manifest.json" />
                    {/* Link to icons */}
                    <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                    {/* Additional PWA meta tags */}
                    <meta name="theme-color" content="#000000" />
                </head>

                    <body className={`flex flex-col min-h-screen ${inter.className}`}>
                        {children}
                    </body>
                </html>
            );
        }
        
        `````````````````````````````````````