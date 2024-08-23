import { GiTwoCoins } from "react-icons/gi";
import Triangle from "../basics/Triangle";
import { WiDayLightWind } from "react-icons/wi";
import { BsStars } from "react-icons/bs";
import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from '@/lib/constants';
import { useAuth } from "@/contexts/AuthContext";


export default function Header() {
	
	const { setMainPage } = useMainUi();
	const { user } = useAuth();

	return ( 
		<header className="p-4 shadow-md" >
			<div className="flex justify-between items-center mx-3">
				<div className="flex flex-row">
					<div className="uppercase text-xl tracking-wider" style={{ letterSpacing: "8px" }}>
						Personal Expense Management
					</div>
					<div className="flex flex-col text-secondary uppercase text-xs">
						<BsStars size={15} className="text-red-600 "/>
					</div>
				</div>

				<div className="flex-grow"></div>

				{user === null && <div className="flex flex-row space-x-1 items-center">
					<button className="text-teal-green hover:text-teal-600" onClick={() => setMainPage(Constant.PAGE_USER_REGISTRATION)}>Register</button>
					<div className="bg-teal-green w-4 h-4 rounded-full"></div>
				</div>}

				{user !== null && <div className="flex flex-row space-x-1 items-center">
					<button className="text-red-500 hover:text-red-600" onClick={() => setMainPage(Constant.PAGE_USER_REGISTRATION)}>Logout</button>
					<div className="bg-red-500 w-4 h-4 rounded-full"></div>
				</div>}
			</div>

		</header>
    )
}