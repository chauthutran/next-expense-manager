import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Expense Management Application (PWA)',
    short_name: 'Expense Management App',
    description: 'Expense Management Application (PWA)',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/expense-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icons/expense-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

export const viewport = {
  initialScale: 1,
  width: "device-width",
  userScalable: false,
};