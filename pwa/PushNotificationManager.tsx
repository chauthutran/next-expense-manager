'use client';

import { useEffect, useState } from "react"
import { subscribeUser, unsubscribeUser, sendNotification } from './actions';

function urlBase64ToUint8Array(base64String: string) {
	// Add padding to the base64 string
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+') // Correctly replace `-` with `+`
        .replace(/_/g, '/'); // Correctly replace `_` with `/`

    // Decode the base64 string
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    // Convert the decoded string to a Uint8Array
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function convertSubscriptuser(sub: PushSubscription) {
	const p256dhKey = sub.getKey('p256dh');
	const authKey = sub.getKey('auth');

	const subscriptionData = {
		endpoint: sub.endpoint,
		keys: {
		p256dh: p256dhKey ? arrayBufferToBase64(new Uint8Array(p256dhKey)) : "",
		auth: authKey ? arrayBufferToBase64(new Uint8Array(authKey)) : "",
		},
	};

	return subscriptionData;
}

function arrayBufferToBase64(buffer: Uint8Array): string {
	return btoa(String.fromCharCode.apply(null, Array.from(buffer)));
}

export default function PushNotificationManager() {
	const [isSupported, setIsSupported] = useState(false);
	const [subscription, setSubscription] = useState<PushSubscription | null>();
	const [message, setMessage] = useState('');

	useEffect(() => {
		// check to ensure the Service Worker is properly registered
		if (!('serviceWorker' in navigator)) {
			throw new Error('Service Worker not supported');
		}

		if ('serviceWorker' in navigator && 'PushManager' in window) {
			setIsSupported(true);
			registerServiceWorker();
		}
	}, []);

	async function registerServiceWorker() {
		const registration = await navigator.serviceWorker.register('/sw.js', {
			scope: '/',
			updateViaCache: 'none',
		});
		
		const sub = await registration.pushManager.getSubscription();
		setSubscription(sub);

		if (sub) {
			const subscriptionData = convertSubscriptuser(sub);

			// Send subscription data to the server
			await subscribeUser(subscriptionData);
		} else {
			console.log('No subscription found');
		}
	}

	async function subscribeToPush() {
		try {
			// Request notification permission
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') {
				// throw new Error('Permission denied for notifications');
				throw new Error("Permission denied for notifications.\n\nTo solve this issue, please follow this: \n- For Chrome: Chrome://settings/content/notifications\n-Check on 'Sites can ask to send notifications'.")
			}

			// Ensure Service Worker and Push Manager are supported
			if (!('serviceWorker' in navigator)) {
				throw new Error('Service Worker not supported.');
			}

			const registration = await navigator.serviceWorker.ready;
			if (!registration.pushManager) {
				throw new Error('Push Manager not supported.');
			}

			// Subscribe to push notifications
			const sub = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
			});
			
			// Handle subscription logic
			setSubscription(sub);
			
			const subscriptData = convertSubscriptuser(sub);
			await subscribeUser(subscriptData);
		} catch (ex) {
			console.error('Error during push subscription:', ex);
		}
	}

	async function unsubscribeFromPush() {
		await subscription?.unsubscribe();
		setSubscription(null);
		await unsubscribeUser();
	}

	async function sendTestNotification() {
		if (subscription) {
			await sendNotification(message);
			setMessage('');
		}
	}

	if (!isSupported) {
		return <p>Push notifications are not supported in this browser.</p>
	}

	return (
		<div className="m-5">
			<h3 className="text-2xl font-semibold">Push Notifications</h3>
			{subscription ? (
				<>
					<p>You are subscribed to push notifications.</p>
					<button className="p-2 bg-yellow-200" onClick={unsubscribeFromPush}>Unsubscribe</button>

					<input
						type="text"
						className="p-2 bg-yellow-200"
						placeholder="Enter notification message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button className="p-2 bg-yellow-200 rounded" onClick={sendTestNotification}>Send Test</button>
				</>
			) : (
				<>
					<p>You are not subscribed to push notifications.</p>
					<button className="p-2 bg-blue-500 text-white" onClick={subscribeToPush}>Subscribe</button>
				</>
			)}
		</div>
	)
}