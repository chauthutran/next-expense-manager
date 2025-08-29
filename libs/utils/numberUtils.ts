export const calculatePercent = ({
    value,
    min = 0,
    max
}: {
    value: number;
    min?: number;
    max: number;
}) => {
    if (max === min) return 0; // avoid division by zero
    return ((value - min) / (max - min)) * 100;
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};
