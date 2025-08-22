import { JSONObject } from 'nextjs-jc-component-libs/dist/libs/definations';

export const getStartDateOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // Set to the first day of the current month
};

export const getStartDateWithHasData = () => {
    return new Date(2023, 0, 1); // Set to the first day of the current month
};

export const convertDateStrToObj = (dateStr: string): Date => {
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(5, 7), 10) - 1;
    const day = parseInt(dateStr.substring(8, 10), 10);

    return new Date(year, month, day);
};

export const formatDateObjToDbDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}T00:00:00.000Z`;
};

export const formatDisplayDateObj = (dateObj: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return dateObj.toLocaleDateString('en-US', options); // Example: "June 27, 2024"
};

export const formatDisplayDate = (dateStr: string): string => {
    const dateObj = new Date(dateStr.split('T')[0]);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return dateObj.toLocaleDateString('en-US', options); // Example: "June 27, 2024"
};

export const formatMonth = (dateStr: string): string => {
    const dateObj = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short'
    };
    return dateObj.toLocaleDateString('en-US', options); // Example: "June 2024"
};

export const isValidDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date.getTime());
};

export const generateMonthList = (
    startDate: Date,
    endDate: Date
): JSONObject[] => {
    if (startDate > endDate) {
        throw new Error('Start date must be before end date');
    }

    const monthList: JSONObject[] = [];
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short'
    };

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        monthList.push({
            month: currentMonth,
            year: currentYear,
            dataKey: `${currentYear}-${currentMonth}`,
            displayName: currentDate.toLocaleDateString('en-US', options)
        });
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthList;
};

export const generateYearList = (
    startDate: Date,
    endDate: Date
): JSONObject[] => {
    if (startDate > endDate) {
        throw new Error('Start date must be before end date');
    }

    let resultList: JSONObject[] = [];
    const fromYear = new Date(startDate).getFullYear();
    const toYear = new Date(endDate).getFullYear();

    for (let year = fromYear; year <= toYear; year++) {
        resultList.push({
            dataKey: year,
            displayName: year
        });
    }

    return resultList;
};

export const generateQuarterList = (
    startDate: Date,
    endDate: Date
): JSONObject[] => {
    const quarters: JSONObject[] = [];
    let currentYear = startDate.getFullYear();
    let currentQuarter = Math.ceil((startDate.getMonth() + 1) / 3);

    const endYear = endDate.getFullYear();
    const endQuarter = Math.ceil((endDate.getMonth() + 1) / 3);

    while (
        currentYear < endYear ||
        (currentYear === endYear && currentQuarter <= endQuarter)
    ) {
        quarters.push({
            year: currentYear,
            quarter: currentQuarter,
            dataKey: `{currentYear}-${currentQuarter}`,
            displayName: `Q${currentQuarter} ${currentYear}`
        });

        currentQuarter++;
        if (currentQuarter > 4) {
            currentQuarter = 1;
            currentYear++;
        }
    }

    return quarters;
};

export const getYearFromDateStr = (dateStr: string): number => {
    // if (!dateStr || dateStr.length < 10) {
    //     return null;
    // }

    // return parseInt(dateStr.split('-')[0]);
    return new Date(dateStr).getFullYear();
};

export const formatDateForInput = (isoDate?: string) => {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
};