'use client';

import { useEffect } from 'react';
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const usePWAInstallPrompt = () => {
  useEffect(() => {
    

let deferredPrompt: BeforeInstallPromptEvent | null = null;


    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      deferredPrompt = event;
      console.log('PWA can be installed!');

      // Optionally show an install button here
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);
};

export default usePWAInstallPrompt;