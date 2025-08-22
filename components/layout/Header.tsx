import { BsStars, BsThreeDots } from 'react-icons/bs';
import { useMainUi } from '@/contexts/MainUiContext';
import * as Constant from '@/libs/constants';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavMenu from './NavMenu';

export default function Header({
    handleOpenSlideBar
}: {
    handleOpenSlideBar: () => void;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/';

    return (
        <header className={`py-4`}>
            <div className="flex justify-between items-center flex-col">
                <div className="flex flex-row">
                    {!isLoginPage && <button
                        className="flex lg:hidden md:hidden"
                        onClick={handleOpenSlideBar}
                    >
                        <BsThreeDots />
                    </button>}

                    <div
                        className="uppercase text-xl tracking-wider hidden mx-3 md:block"
                        style={{ letterSpacing: '8px' }}
                    >
                        Personal Expense Management
                    </div>
                    <div
                        className="uppercase text-xs tracking-wider md:hidden"
                        style={{ letterSpacing: '3px' }}
                    >
                        Personal Expense Management
                    </div>
                    <div className="flex flex-col text-secondary uppercase text-xs">
                        <BsStars size={15} className="text-red-600 " />
                    </div>
                </div>

                {!isLoginPage && (
                    <nav className='hidden lg:flex md:flex'>
                        <NavMenu direction="horizontal" />
                    </nav>
                )}
            </div>
        </header>
    );
}
