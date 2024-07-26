import { useEffect, useState } from 'react';

export const useLocale = () => {
    const [locale, setLocale] = useState('en');

    useEffect(() => {
        if (!navigator) return;

        const language =
            (navigator.languages || [])[0] || navigator.language || '';

        language && setLocale(language);
    }, []);

    return locale;
};
