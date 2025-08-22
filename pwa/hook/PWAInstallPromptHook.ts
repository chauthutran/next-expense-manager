'use client';

import { useEffect } from 'react';

const usePWAInstallPrompt = () => {
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (event) => {
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