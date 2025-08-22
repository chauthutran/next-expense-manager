"use client";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AppWrapper from "../components/AppWrapper";
import { MainUiProvider } from "../contexts/MainUiContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { CategoryProvider } from "../contexts/CategoryContext";
import PushNotificationManager from "../pwa/PushNotificationManager";
import InstallPrompt from "../pwa/InstallPrompt";
import { useEffect, useState } from "react";
import usePWAInstallPrompt from "../pwa/hook/PWAInstallPromptHook";
import LoginForm from "@/components/auth/LoginForm";
import ProtectedRoute from "@/components/ProtectedRoute";

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
