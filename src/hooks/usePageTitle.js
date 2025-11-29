import { useEffect } from 'react';

export const usePageTitle = (title) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = title ? `${title} - Agentic AI at Home` : 'Agentic AI at Home';

        return () => {
            document.title = previousTitle;
        };
    }, [title]);
};
