
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function Button({
    title,
    ...rest
}: ButtonProps) {
    return (
        <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md"
            {...rest} // pass all other props like onClick, type, disabled, etc.
        >
            {title}
        </button>
    );
}
