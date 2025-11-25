import { Shield, Smartphone, Globe, AlertTriangle, Check, ArrowLeft, Key, Download, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WalletGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Navigation */}
                <Link
                    to="/how-to-buy-ergo"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to How to Buy
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Setting Up Your <span className="text-green-600">Ergo Wallet</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your wallet is your personal bank. Follow this guide to set it up safely and securely.
                    </p>
                </div>

                {/* Security First Alert */}
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-md mb-12">
                    <div className="flex items-start">
                        <AlertTriangle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-red-800 mb-2">CRITICAL SECURITY WARNING</h3>
                            <p className="text-red-700 mb-4">
                                When you create a wallet, you will be given a <strong>Seed Phrase</strong> (12-24 words).
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-red-800 font-medium">
                                <li>NEVER share this phrase with anyone.</li>
                                <li>NEVER type it into a website (except your wallet extension).</li>
                                <li>NEVER take a screenshot or photo of it.</li>
                                <li>Write it down on PAPER and hide it safely.</li>
                            </ul>
                            <p className="mt-4 text-sm text-red-600 italic">
                                "Not your keys, not your coins." If you lose this phrase, you lose your money forever.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Universal Access Info */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl shadow-md mb-12">
                    <div className="flex items-start">
                        <Key className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold text-blue-800 mb-2">One Seed, Any Wallet</h3>
                            <p className="text-blue-700">
                                Your <strong>Seed Phrase</strong> is your universal key. You can use the <strong>same phrase</strong> to access your funds on:
                            </p>
                            <ul className="list-disc list-inside mt-2 text-blue-800 font-medium">
                                <li><strong>Nautilus</strong> (on your computer)</li>
                                <li><strong>Terminus</strong> (on your iPhone)</li>
                                <li><strong>Ergo Wallet App</strong> (on your Android)</li>
                            </ul>
                            <p className="mt-2 text-sm text-blue-600 italic">
                                You do NOT need to create separate wallets for each device. Just "Restore Wallet" using your seed phrase!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Wallet Options */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">

                    {/* Nautilus Wallet (Desktop) */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                        <div className="bg-blue-600 p-6 text-white text-center">
                            <Globe className="w-12 h-12 mx-auto mb-3" />
                            <h2 className="text-2xl font-bold">Nautilus Wallet</h2>
                            <p className="text-blue-100">Best for Desktop (Chrome/Firefox)</p>
                        </div>
                        <div className="p-8 flex-1">
                            <ol className="space-y-6">
                                <li className="flex items-start">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
                                    <div>
                                        <strong className="block text-gray-900 mb-1">Download Extension</strong>
                                        <p className="text-sm text-gray-600">
                                            Go to the <a href="https://chromewebstore.google.com/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai?hl=en" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Chrome Web Store</a> and click "Add to Chrome".
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
                                    <div>
                                        <strong className="block text-gray-900 mb-1">Create Wallet</strong>
                                        <p className="text-sm text-gray-600">
                                            Open the extension and select <strong>"Create Wallet"</strong>.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
                                    <div>
                                        <strong className="block text-gray-900 mb-1">Save Seed Phrase</strong>
                                        <p className="text-sm text-gray-600">
                                            Write down your recovery phrase on paper. Verify it when asked.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">4</span>
                                    <div>
                                        <strong className="block text-gray-900 mb-1">Buy Option</strong>
                                        <p className="text-sm text-gray-600">
                                            Once set up, you can buy Ergo directly inside Nautilus using the "Buy" button (via Banxa).
                                        </p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Mobile Wallets */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                        <div className="bg-green-600 p-6 text-white text-center">
                            <Smartphone className="w-12 h-12 mx-auto mb-3" />
                            <h2 className="text-2xl font-bold">Mobile Wallets</h2>
                            <p className="text-green-100">iOS & Android Options</p>
                        </div>
                        <div className="p-8 flex-1">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">For iOS (iPhone)</h3>
                                    <p className="text-sm text-gray-600 mb-2">Use <strong>Terminus Wallet</strong>.</p>
                                    <a href="https://apps.apple.com/us/app/terminus-wallet-ergo/id1640042565" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">
                                        Download Terminus on App Store →
                                    </a>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">For Android</h3>
                                    <p className="text-sm text-gray-600 mb-2">Use <strong>Ergo Wallet App</strong>.</p>
                                    <a href="https://play.google.com/store/apps/details?id=org.ergoplatform.android" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold">
                                        Download Ergo Wallet App on Play Store →
                                    </a>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                                    <strong className="block text-yellow-800 mb-1">Setup Tip:</strong>
                                    <p className="text-sm text-yellow-700">
                                        When creating a new wallet, you will see your <strong>Seed Phrase</strong>. Write it down immediately!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-indigo-50 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-indigo-900 mb-4">Wallet Set Up?</h3>
                    <p className="text-indigo-800 mb-6 max-w-2xl mx-auto">
                        Now that you have your address (it starts with '9'), you are ready to receive Ergo.
                    </p>
                    <Link
                        to="/how-to-buy-ergo"
                        className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md"
                    >
                        Continue to Buying Guide →
                    </Link>
                </div>

            </div>
        </div>
    );
}
