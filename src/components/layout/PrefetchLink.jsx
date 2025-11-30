import React from 'react';
import { Link } from 'react-router-dom';
import { routeConfig } from '../../config/routes';

const pathToKey = {
    '/part1': 'part1',
    '/part2': 'part2',
    '/part3': 'part3',
    '/part4': 'part4',
    '/part5': 'part5',
    '/success': 'success',
    '/create-account': 'createAccount',
    '/login': 'login',
    '/pay-ergo': 'ergoPayment',
    '/why-ergo': 'whyErgo',
    '/payment-guide': 'paymentGuide',
    '/ergo-guide': 'ergoGuide',
};

const PrefetchLink = ({ to, children, ...props }) => {
    const handlePrefetch = () => {
        const key = pathToKey[to];
        if (key && routeConfig[key] && routeConfig[key].prefetch) {
            // Execute the import function to start loading the chunk
            routeConfig[key].prefetch();
        }
    };

    return (
        <Link
            to={to}
            onMouseEnter={handlePrefetch}
            onTouchStart={handlePrefetch}
            {...props}
        >
            {children}
        </Link>
    );
};

export default PrefetchLink;
