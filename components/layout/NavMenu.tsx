import { useAuth } from "@/contexts/AuthContext"
import useClickOutside from "@/hooks/useClickOutside"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaChartBar, FaHome } from "react-icons/fa"
import { FiDollarSign } from "react-icons/fi"
import { GiExpense } from "react-icons/gi"
import { IoLogOut } from "react-icons/io5"

const MENU_ITEMS = [
    { name: "Dashboard", path: "/pages/dashboard", icon: <FaHome size={20} />},
    { name: "Reports", path: "/pages/reports", icon: <FaChartBar size={20} />},
    { name: "Expense", path: "/pages/expense", icon: <GiExpense size={20} />},
    { name: "Budget", path: "/pages/budget", icon: <FiDollarSign size={20} />},
];

export default function NavMenu({
    direction = 'horizontal', // 'horizontal' for header, 'vertical' for sidebar,
    onClose,
}: {
    direction?: 'horizontal' | 'vertical',
    onClose?: () => void,
}) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, setUser } = useAuth();
    
    const handleNavigate = (path: string) => {
        router.push(path);
        if(onClose) onClose();
    }
    
    const handleOnLogout = () => {
        const ok = confirm("Are you sure you want to logout ?");
        if(ok) {
            router.push("/");
            setUser(null);
        }
    }
    
    const isActive = (menuPathname: string) => pathname === menuPathname;
    
    return (
        <ul 
            className={
                direction === 'horizontal' 
                    ? "flex space-x-6 py-4 px-6 bg-white shadow-sm rounded-lg"
                    : "flex flex-col space-y-2 p-4 bg-white h-full shadow-md rounded-lg"
            }
        >
            {MENU_ITEMS.map((item) => (
                <li
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                        isActive(item.path)
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                    }`}
                >
                    {direction === 'vertical' && item.icon}
                    <span>{item.name}</span>
                </li>
            ))}
            
            <button
                onClick={handleOnLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-red-600 hover:bg-red-100 transition-colors duration-200 mt-auto"
            >
                {direction === 'vertical' && <IoLogOut size={20} />}
                <span>Logout</span>
            </button>
        </ul>
    )
}