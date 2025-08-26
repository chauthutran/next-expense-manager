export default function ChartTypes({
    types,
    selected = '',
    onItemClick
}: {
    types: string[];
    selected?: string;
    onItemClick: (type: string) => void;
}) {
    const selectedType = selected || types[0] || '';

    return (
        <>
            {types.map((type: string) => (
                <div
                    key={type}
                    className={`cursor-pointer rounded-lg border py-2 px-3 ${
                        selectedType === type && 'bg-blue-200'
                    }`}
                    onClick={() => onItemClick(type)}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
            ))}
        </>
    );
}
