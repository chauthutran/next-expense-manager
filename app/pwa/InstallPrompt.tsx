'use client';


import { useEffect, useState } from "react"
import { FaShareAlt } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";

export default function InstallPrompt() {
	const [isIOS, setIsIOS] = useState(false)
	const [isStandalone, setIsStandalone] = useState(false)

	useEffect(() => {
		setIsIOS(
			/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
		)

		setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
	}, [])

	if (isStandalone) {
		return null; // Don't show install button if already installed
	}

	return (
		<>
			{isIOS && (<div>
				<h3>Install App</h3>
				<button>Add to Home Screen</button>

				<p>
					To install this app on your iOS device, tap the share button
					<span role="img" aria-label="share icon">
						{' '}
						<FaShareAlt />{' '}
					</span>
					and then `Add to Home Screen`
					<span role="img" aria-label="plus icon">
						{' '}
						<TiPlus />{' '}
					</span>.
				</p>
			</div>)}
		</>
	)
}
