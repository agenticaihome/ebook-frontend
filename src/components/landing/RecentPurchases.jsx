import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User } from 'lucide-react';

const RecentPurchases = () => {
    const [notification, setNotification] = useState(null);

    const purchases = [
        { name: "Sarah K.", location: "London, UK", product: "Life OS System" },
        { name: "Marcus D.", location: "Austin, TX", product: "Standard Access" },
        { name: "Elena R.", location: "Berlin, DE", product: "Crypto Access" },
        { name: "David L.", location: "Toronto, CA", product: "Life OS System" },
        { name: "Dr. Chen", location: "Singapore", product: "Standard Access" }
    ];

    useEffect(() => {
        // Initial delay
        const initialTimeout = setTimeout(() => {
            showRandomPurchase();
        }, 5000);

        // Loop
        const interval = setInterval(() => {
            showRandomPurchase();
        }, 20000); // Show every 20 seconds

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    const showRandomPurchase = () => {
        const randomPurchase = purchases[Math.floor(Math.random() * purchases.length)];
        setNotification(randomPurchase);

        // Hide after 5 seconds
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -50 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-6 left-6 z-50 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-2xl shadow-black/50 max-w-xs hidden md:block"
                >
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shrink-0">
                            <User size={18} className="text-white" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                                {notification.name}
                                <span className="text-xs font-normal text-slate-400 flex items-center gap-1">
                                    <MapPin size={10} /> {notification.location}
                                </span>
                            </div>
                            <div className="text-xs text-green-400 mt-0.5">
                                Just purchased <strong>{notification.product}</strong>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-1">
                                2 minutes ago
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RecentPurchases;
