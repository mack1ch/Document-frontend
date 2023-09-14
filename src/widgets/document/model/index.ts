import { parseISO } from 'date-fns';

export const convertFirstLetterToLowerCase = (input: string) => {
    const words = input.split(' ');
    const convertedWords = words.map((word) => {
        const firstLetter = word.charAt(0).toLowerCase();
        const restOfWord = word.slice(1);
        return firstLetter + restOfWord;
    });
    return convertedWords.join(' ');
};
export const formattedDate = (date: string): string => {
    const docDate = parseISO(date);
    const formattedDate = Intl.DateTimeFormat('ru-RU').format(docDate);

    return formattedDate;
};

export const formatNumberWithDecimalSeparator = (num: number) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
};

