import { calculatePercent, formatCurrency } from '@/utils';

export default function ProgressBar({
    value,
    min = 0,
    max,
    label,
    color = 'bg-blue-500',
    icon,
}: {
    value: number;
    min?: number;
    max: number;
    label: string;
    color: string;
    icon: string;
}) {
    const percent = calculatePercent({ value, min, max }).toFixed(2);
    const sanitizedIcon = icon.replace(/class=/g, 'className=');

    return (
        <div className="w-full">
            <div
                className="w-10 h-10"
                dangerouslySetInnerHTML={{ __html: sanitizedIcon }}
            />
            <div className="my-1 text-sm text-gray-700 font-bold">
                <span>{label}</span>
            </div>
            <div className='mt-5 italic flex justify-between text-gray-600'>
                <div>{formatCurrency(value)}</div>
                <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                    className={`h-4 transition-all duration-300 bg-blue-500`}
                    style={{ width: `${percent}%` }}
                    // style={{ width: `${percent}%`, backgroundColor: `${color}` }}
                />
            </div>
        </div>
    );
}
