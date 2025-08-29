"use client";

import { useEffect, useState } from "react";
import usePWAInstallPrompt from "../pwa/hook/PWAInstallPromptHook";
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
	const [isOffline, setIsOffline] = useState<boolean>(false);

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
			{/* {isOffline && <p>You are offline. Some features may not be available.</p>} */}
			<LoginForm />
			
			{/* <div>
				<PushNotificationManager />
				<InstallPrompt />
			</div>

			<main>
				<MainUiProvider>
					<AuthProvider>
						<CategoryProvider>
							<div className="h-screen flex flex-col">
								<Header />
								<AppWrapper />
								<Footer />
							</div>
						</CategoryProvider>
					</AuthProvider>
				</MainUiProvider>
			</main> */}
		</>
	)
}
