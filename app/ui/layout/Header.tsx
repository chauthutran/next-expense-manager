import { GiTwoCoins } from "react-icons/gi";
import Triangle from "../basics/Triangle";
import { WiDayLightWind } from "react-icons/wi";
import { BsStars } from "react-icons/bs";
import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from '@/lib/constants';
import { useAuth } from "@/contexts/AuthContext";


export default function Header() {
	
	const { mainPage, setMainPage } = useMainUi();
	const { user, logout } = useAuth();

	const handleLogout = () => {
		const ok = confirm("are you sure you want to logout ?");
		if( ok ) {
			logout();
			setMainPage(Constant.PAGE_LOGIN);
		}
	}

	return ( 
		<header className={`p-4 shadow-md`}>
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

				{mainPage === Constant.PAGE_LOGIN  && <div onClick={() => setMainPage(Constant.PAGE_USER_REGISTRATION)} className="flex flex-row space-x-1 items-center text-sm border border-slate-400 px-4 py-1 rounded-md">
					<button className="text-teal-green hover:text-teal-600">Register</button>
					<div className="bg-teal-green w-2 h-2 rounded-full"></div>
				</div>}

				{mainPage === Constant.PAGE_USER_REGISTRATION && <div  onClick={() => setMainPage(Constant.PAGE_LOGIN)} className="flex flex-row space-x-1 items-center text-sm border border-slate-400 px-4 py-1 rounded-md">
					<button className="text-teal-green hover:text-teal-600">Login</button>
					<div className="bg-teal-green w-2 h-2 rounded-full"></div>
				</div>}

				{user !== null && <div  onClick={() => handleLogout()} className="flex flex-row space-x-1 items-center text-sm border border-slate-400 px-4 py-1 rounded-md">
					<button className="text-red-500 hover:text-red-600">Logout</button>
					<div className="bg-red-500 w-2 h-2 rounded-full"></div>
				</div>}
			</div>

		</header>
    )
}