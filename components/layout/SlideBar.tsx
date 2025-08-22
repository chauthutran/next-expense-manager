import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import NavMenu from './NavMenu';
import useClickOutside from '@/hooks/useClickOutside';

export default function SlideBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const dropdownRef = useClickOutside(() => onClose());

  return (
    <aside
      className={`flex lg:hidden fixed left-0 top-0 h-screen z-50 w-64 bg-gray-50 shadow-lg p-5 flex-col text-black transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      ref={dropdownRef}
    >
      <div className="flex justify-between items-center mb-6">
        {/* <AppIcon size={45} /> */}
        <button onClick={onClose} className="text-2xl hover:text-gray-300 transition">
          <MdKeyboardDoubleArrowLeft />
        </button>
      </div>

      <NavMenu direction="vertical" onClose={onClose} />
    </aside>
  );
}