import { GiTwoCoins } from "react-icons/gi";
import Triangle from "../basics/Triangle";
import { WiDayLightWind } from "react-icons/wi";
import { BsStars } from "react-icons/bs";


export default function Header() {
	
	return ( 
		<header className="p-4 shadow-md" >
			<div className="flex justify-between items-center ml-5">
				<div className="flex flex-row">
					<div className="uppercase text-xl tracking-wider text-textPrimary" style={{ letterSpacing: "8px" }}>
					Personal Expense Management
					</div>
					<div className="flex flex-col text-secondary uppercase text-xs">
						{/* <span className="text-red-600">*</span> */}
						{/* <Triangle /> */}
						{/* <WiDayLightWind size={30} /> */}
						<BsStars size={15} className="text-red-600"/>
					</div>
				</div>

				<div className="flex-grow"></div>

				<div className="flex flex-row space-x-1 items-center">
					<div className="bg-red-600 w-4 h-4 rounded-full"></div>
					<button className="">Register</button>
				</div>
			</div>

		</header>
    )
}