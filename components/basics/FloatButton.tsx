export default function FloatButton({
    title,
    className,
    onClick
}: {
    title: string;
    className?: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick} // your click handler
            className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-200 ${className}`}
            title={title}
        >
            +
        </button>
    );
}
