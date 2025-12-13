import React from 'react';

export default function DecentralizationTable() {
    const data = [
        { factor: "Premine (Insider Coins)", btc: "0%", eth: "72%", sol: "High VC", erg: "0%", winner: "erg" },
        { factor: "Consensus Model", btc: "PoW (ASIC)", eth: "PoS (Stakers)", sol: "PoS (Validators)", erg: "PoW (GPU)", winner: "erg" },
        { factor: "Mining/Staking Access", btc: "Industrial Farms", eth: "32 ETH ($100k+)", sol: "Massive Stake", erg: "Consumer GPU", winner: "erg" },
        { factor: "VC Backing", btc: "None", eth: "Heavy", sol: "Heavy", erg: "None", winner: "erg" },
        { factor: "Smart Contracts", btc: "Limited", eth: "Yes", sol: "Yes", erg: "Yes (eUTXO)", winner: "erg" },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-600 text-slate-300 text-sm uppercase tracking-wider">
                        <th className="p-4">Factor</th>
                        <th className="p-4 text-orange-400">Bitcoin</th>
                        <th className="p-4 text-blue-400">Ethereum</th>
                        <th className="p-4 text-purple-400">Solana</th>
                        <th className="p-4 text-green-400 bg-green-900/10 border-t-2 border-green-500">Ergo</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300 text-sm">
                    {data.map((row, i) => (
                        <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 font-bold text-slate-200">{row.factor}</td>
                            <td className="p-4">{row.btc}</td>
                            <td className="p-4">{row.eth}</td>
                            <td className="p-4">{row.sol}</td>
                            <td className="p-4 font-bold text-green-400 bg-green-900/10 border-x border-green-500/10">
                                {row.erg}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 text-center text-xs text-slate-300 italic">
                * Honest assessment based on public launch data and consensus mechanisms.
            </div>
        </div>
    );
}
