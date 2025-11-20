import React, { useState, useEffect } from 'react';
import { Check, Shield, Clock, TrendingUp, Zap, Book, Lock, AlertCircle, Download, Coins } from 'lucide-react';

export default function SalesPage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [email, setEmail] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentStep, setPaymentStep] = useState('initial');
  const [priceInfo, setPriceInfo] = useState({
    ergAmount: 0,
    ergUsdPrice: 0,
    priceUsd: 15.00
  });
  const [priceLoading, setPriceLoading] = useState(true);
  
  const WALLET_ADDRESS = "9gxmJ4attdDx1NnZL7tWkN2U9iwZbPWWSEcfcPHbJXc7xsLq6QK";
  const BACKEND_URL = 'https://ebook-backend-production-8f68.up.railway.app';

  // Fetch live ERG price from backend
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/price`);
        const data = await response.json();
        
        if (data.success) {
          setPriceInfo({
            ergAmount: data.ergAmount,
            ergUsdPrice: data.ergUsdPrice,
            priceUsd: data.priceUsd
          });
        }
        setPriceLoading(false);
      } catch (error) {
        console.error('Error fetching price:', error);
        setPriceLoading(false);
      }
    };

    fetchPrice();
    // Refresh price every 5 minutes
    const interval = setInterval(fetchPrice, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGetFree = () => {
    window.open('/part1.pdf', '_blank');
  };

  const handlePurchaseClick = () => {
    if (!email) {
      alert('Please enter your email address first');
      return;
    }
    setCurrentPage('purchase');
    setPaymentStep('awaiting');
  };

  const handleTransactionSubmit = async () => {
    if (!transactionId || !email) {
      alert('Please fill in all fields');
      return;
    }
    
    setPaymentStep('confirming');
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: transactionId.trim(),
          email: email.trim()
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPaymentStep('confirmed');
      } else {
        setPaymentStep('awaiting');
        alert(`Payment verification failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setPaymentStep('awaiting');
      alert('Failed to verify payment. Please check your transaction ID and try again.');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (currentPage === 'ergo') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => setCurrentPage('home')}
            className="mb-8 text-purple-600 hover:text-purple-700 flex items-center"
          >
            ← Back to Book
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <Coins className="w-20 h-20 text-purple-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Why Ergo?
              </h1>
              <p className="text-xl text-gray-600">
                A smarter, safer way to pay for digital products
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Ergo?</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ergo is a next-generation blockchain platform focused on providing an efficient, secure, and easy way to implement financial contracts. Think of it as digital cash that's more private, more efficient, and more fair than traditional payment methods.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <Shield className="w-10 h-10 text-green-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
                  <p className="text-gray-700">
                    Your transaction is cryptographically secured and doesn't expose your personal information. No credit card numbers, no data breaches.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
                  <Zap className="w-10 h-10 text-blue-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Transactions</h3>
                  <p className="text-gray-700">
                    Transactions confirm in ~2 minutes. No waiting days for payment processing or dealing with payment gateway delays.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <TrendingUp className="w-10 h-10 text-purple-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Minimal Fees</h3>
                  <p className="text-gray-700">
                    Transaction fees are typically less than $0.10, compared to 3-5% for credit cards. This means I can price the book lower and you save money!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border-2 border-orange-200">
                  <Lock className="w-10 h-10 text-orange-600 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Middlemen</h3>
                  <p className="text-gray-700">
                    Direct peer-to-peer payment. No banks, payment processors, or platforms taking a cut. Just you and me.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Why Ergo Instead of Credit Cards?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Lower Fees:</strong> Credit card processors charge 3-5%. Ergo transactions cost less than $0.10, which means lower prices for you.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Privacy:</strong> No need to share credit card numbers or personal financial data. Your payment information stays secure.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Global Access:</strong> Works the same whether you're in the US, Europe, Asia, or anywhere else. No international payment headaches.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span><strong>Direct Payment:</strong> Money goes straight from you to me, with no middlemen taking a cut. More sustainable for independent creators!</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Current Pricing</h3>
                
                {/* Live Price Display */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    {priceLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-pulse text-gray-500">Loading current price...</div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <div className="text-sm text-gray-600 mb-1">Ebook Price</div>
                          <div className="text-4xl font-bold text-gray-900 mb-2">
                            {priceInfo.ergAmount.toFixed(2)} ERG
                          </div>
                          <div className="text-lg text-gray-600">
                            ≈ ${priceInfo.priceUsd.toFixed(2)} USD
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-300 pt-3 mt-3">
                          <div className="text-sm text-gray-500">
                            Current ERG Price: ${priceInfo.ergUsdPrice.toFixed(4)} USD
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Price updates every 5 minutes • Always $15 USD worth of ERG
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Get ERG</h3>
                <p className="text-gray-700 mb-6">
                  Choose the method that works best for your location. Buy a bit more than the ebook price to cover small transaction fees:
                </p>

                {/* US Users - Banxa Method */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🇺🇸</span>
                    <h4 className="text-lg font-bold text-gray-900">For US Residents: Buy Directly with Nautilus (Easiest!)</h4>
                  </div>
                  <p className="text-gray-700 mb-4">Buy ERG with a credit/debit card using Banxa built into Nautilus wallet - no exchange needed! Fastest method for US users.</p>
                  
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-3 min-w-[24px]">1.</span>
                      <div>
                        <strong>Install Nautilus Wallet</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          Go to <a href="https://chromewebstore.google.com/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai?hl=en&pli=1" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Chrome Web Store</a> and install the Nautilus extension (works on Chrome, Brave, Edge)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-3 min-w-[24px]">2.</span>
                      <div>
                        <strong>Create Your Wallet (2 minutes)</strong>
                        <p className="text-sm text-gray-600 mt-1">Follow setup wizard → Write down your seed phrase on paper (VERY IMPORTANT - this is your backup!) → Set a password → Done!</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-3 min-w-[24px]">3.</span>
                      <div>
                        <strong>Click "Buy" in Nautilus</strong>
                        <p className="text-sm text-gray-600 mt-1">In Nautilus wallet, click the "Buy" button → This opens Banxa payment gateway</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-3 min-w-[24px]">4.</span>
                      <div>
                        <strong>Buy $20-25 worth of ERG</strong>
                        <p className="text-sm text-gray-600 mt-1">Enter amount → Enter credit/debit card info → Complete ID verification (takes 2-5 min first time) → Confirm purchase</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-blue-600 mr-3 min-w-[24px]">5.</span>
                      <div>
                        <strong>Wait for ERG to Arrive (5-15 minutes)</strong>
                        <p className="text-sm text-gray-600 mt-1">ERG will appear in your Nautilus wallet automatically! Then come back here and purchase the ebook!</p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 mt-4">
                    <p className="text-sm text-blue-900 mb-2">
                      <strong>💳 Banxa Fees:</strong> Typically 2-5% on credit/debit card purchases
                    </p>
                    <p className="text-xs text-blue-800">
                      ✅ Accepted cards: Visa, Mastercard, some debit cards • ❌ Not accepted: Amex, prepaid cards
                    </p>
                  </div>
                </div>

                {/* International Users - CoinEx Method */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🌍</span>
                    <h4 className="text-lg font-bold text-gray-900">For International Users: CoinEx (No KYC Required!)</h4>
                  </div>
                  <p className="text-gray-700 mb-4">Great for users outside the US - no identity verification needed for amounts under $10,000/day!</p>
                  
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-bold text-green-600 mr-3 min-w-[24px]">1.</span>
                      <div>
                        <strong>Sign up for CoinEx (2 minutes)</strong>
                        <p className="text-sm text-gray-600 mt-1">Go to <a href="https://www.coinex.com" target="_blank" rel="noopener noreferrer" className="text-green-600 underline">coinex.com</a> → Click "Sign Up" → Enter email + password → Verify email → Enable 2FA (recommended for security)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-green-600 mr-3 min-w-[24px]">2.</span>
                      <div>
                        <strong>Get USDT (Stablecoin)</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Option A:</strong> Click "Buy Crypto" → Use credit card to buy $20-25 USDT<br/>
                          <strong>Option B:</strong> If you have crypto elsewhere, send USDT/BTC/ETH to CoinEx, then trade for USDT
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-green-600 mr-3 min-w-[24px]">3.</span>
                      <div>
                        <strong>Trade USDT for ERG</strong>
                        <p className="text-sm text-gray-600 mt-1">Click "Markets" → Search "ERG/USDT" → Click it → On trading page, click "Buy ERG" → Buy $20-25 worth → Click "Buy" to confirm</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-green-600 mr-3 min-w-[24px]">4.</span>
                      <div>
                        <strong>That's it! You can pay directly from CoinEx</strong>
                        <p className="text-sm text-gray-600 mt-1">When you're ready to buy the ebook, you can send the ERG <strong>directly from your CoinEx account</strong> to the payment address. No need to withdraw to a wallet first!</p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3 mt-4">
                    <p className="text-sm text-green-900 mb-1">
                      <strong>✅ Benefits:</strong> No KYC/ID needed • Available worldwide • Super low fees (~0.1%) • Can pay directly from exchange
                    </p>
                  </div>
                </div>

                {/* Alternative - KuCoin Method */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6 mb-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">🌐</span>
                    <h4 className="text-lg font-bold text-gray-900">Alternative: KuCoin (Popular Worldwide)</h4>
                  </div>
                  <p className="text-gray-700 mb-4">Large, reputable exchange - one of the biggest crypto platforms. Available in 200+ countries!</p>
                  
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="font-bold text-purple-600 mr-3 min-w-[24px]">1.</span>
                      <div>
                        <strong>Sign up for KuCoin</strong>
                        <p className="text-sm text-gray-600 mt-1">Go to <a href="https://www.kucoin.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">kucoin.com</a> → Click "Sign Up" → Use email or phone → Verify your account</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-purple-600 mr-3 min-w-[24px]">2.</span>
                      <div>
                        <strong>Complete Basic Verification (5-10 minutes)</strong>
                        <p className="text-sm text-gray-600 mt-1">Click "Verify" → Upload ID photo (driver's license or passport) → Take selfie → Wait for approval (usually instant) → This unlocks card purchases!</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-purple-600 mr-3 min-w-[24px]">3.</span>
                      <div>
                        <strong>Buy Crypto with Card</strong>
                        <p className="text-sm text-gray-600 mt-1">
                          Click "Buy Crypto" (top of page) → Select "Credit/Debit Card" → Choose USDT → Enter $20-25 → Enter card details → Complete purchase
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-purple-600 mr-3 min-w-[24px]">4.</span>
                      <div>
                        <strong>Trade USDT for ERG</strong>
                        <p className="text-sm text-gray-600 mt-1">Go to "Trade" → "Spot Trading" → Search "ERG/USDT" → Click "Buy" → Buy $20-25 worth → Click "Buy ERG" → Trade completes instantly!</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-purple-600 mr-3 min-w-[24px]">5.</span>
                      <div>
                        <strong>Ready to pay! You can send directly from KuCoin</strong>
                        <p className="text-sm text-gray-600 mt-1">When buying the ebook, send ERG <strong>directly from your KuCoin account</strong> to the payment address. No separate wallet needed!</p>
                      </div>
                    </li>
                  </ol>
                  
                  <div className="bg-purple-100 border border-purple-300 rounded-lg p-3 mt-4">
                    <p className="text-sm text-purple-900 mb-1">
                      <strong>📱 Bonus:</strong> KuCoin has excellent mobile apps for iOS and Android - manage everything on the go!
                    </p>
                  </div>
                </div>

                {/* Quick Comparison */}
                <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Quick Comparison</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-gray-700">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left">Method</th>
                          <th className="px-4 py-2 text-left">Best For</th>
                          <th className="px-4 py-2 text-left">Total Time</th>
                          <th className="px-4 py-2 text-left">Fees</th>
                          <th className="px-4 py-2 text-left">ID Required?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3"><strong>Nautilus + Banxa</strong></td>
                          <td className="px-4 py-3">🇺🇸 US residents</td>
                          <td className="px-4 py-3">15-20 min</td>
                          <td className="px-4 py-3">3-5%</td>
                          <td className="px-4 py-3">Yes (quick)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3"><strong>CoinEx</strong></td>
                          <td className="px-4 py-3">🌍 International</td>
                          <td className="px-4 py-3">15-20 min</td>
                          <td className="px-4 py-3">~0.1%</td>
                          <td className="px-4 py-3">No (under $10k/day)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3"><strong>KuCoin</strong></td>
                          <td className="px-4 py-3">🌐 Worldwide</td>
                          <td className="px-4 py-3">25-30 min</td>
                          <td className="px-4 py-3">2-3%</td>
                          <td className="px-4 py-3">Yes (basic ID)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 italic">
                    * Book is always $15 USD worth of ERG • Price shown above updates automatically
                  </p>
                </div>

                {/* Helpful Tips */}
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mt-6">
                  <h4 className="font-bold text-gray-900 mb-3">💡 Helpful Tips:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• <strong>How much to buy:</strong> Buy $20-25 worth of ERG (covers the $15 book price + transaction fees)</li>
                    <li>• <strong>Dynamic pricing:</strong> The ERG amount adjusts automatically to always equal $15 USD</li>
                    <li>• <strong>Pay from exchange:</strong> With CoinEx or KuCoin, you can send ERG directly from the exchange - no wallet needed!</li>
                    <li>• <strong>Transaction fees:</strong> Ergo blockchain fees are usually less than $0.10</li>
                    <li>• <strong>Extra ERG?:</strong> If you buy extra, you can hold it or trade it back later. ERG is a real cryptocurrency!</li>
                  </ul>
                </div>

                {/* FAQ Section */}
                <div className="bg-white border-2 border-gray-300 rounded-xl p-6 mt-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">❓ Frequently Asked Questions</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">💰 "How much should I actually buy?"</p>
                      <p className="text-sm text-gray-700">Buy about $20-25 worth of ERG. The book costs $15 USD in ERG (amount shown above), and the extra covers transaction fees. Current price updates every 5 minutes!</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">📈 "Why does the ERG amount change?"</p>
                      <p className="text-sm text-gray-700">The book price is fixed at $15 USD, but ERG's market price fluctuates. Our system automatically calculates how much ERG equals $15, so you always pay the same USD value!</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">🤔 "I've never used crypto before. Is this hard?"</p>
                      <p className="text-sm text-gray-700">Not at all! If you're a US user, it's as easy as buying something with a credit card. Just follow the Banxa steps above - takes 15 minutes total.</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">🔒 "Is this safe? What about scams?"</p>
                      <p className="text-sm text-gray-700">Yes! Nautilus is a non-custodial wallet (YOU control your money). Banxa, KuCoin, and CoinEx are all established, legitimate services used by millions.</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">💳 "Can I just use PayPal or credit card directly?"</p>
                      <p className="text-sm text-gray-700">Unfortunately no - PayPal charges 10%+ fees and freezes accounts randomly. Credit card processors are even worse for crypto. That's exactly why I use ERG - to keep prices low!</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 mb-1">🆘 "What if I need help?"</p>
                      <p className="text-sm text-gray-700">The Ergo community is incredibly helpful! Join the Discord or Telegram (links at <a href="https://ergoplatform.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">ergoplatform.org</a>). You can also email agenticaiathome@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🌍 Supporting Decentralization</h3>
                <p className="text-gray-700">
                  By accepting Ergo, I'm supporting a fairer financial system. One where creators can sell directly to readers without massive platform fees, where privacy is respected, and where innovation thrives.
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:shadow-xl transition-shadow"
                >
                  Got it! Take me back to purchase →
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-400">© 2026 Dr. Maya Patel • Agentic AI at Home</p>
          </div>
        </footer>
      </div>
    );
  }

  if (currentPage === 'purchase') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => setCurrentPage('home')}
            className="mb-8 text-purple-600 hover:text-purple-700 flex items-center"
          >
            ← Back to Book Details
          </button>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Purchase the Complete Agentic AI at Home Book</h1>
            <p className="text-center text-gray-600 mb-8">Complete your collection and get the full book!</p>

            {paymentStep === 'awaiting' && (
              <div className="space-y-6">
                {/* Payment Instructions */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
                  <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                    Send Payment via Ergo
                  </h4>
                  
                  <div className="bg-white rounded-lg p-5 mb-4">
                    <div className="mb-4">
                      <p className="text-sm text-gray-700 font-semibold mb-2">Payment Amount:</p>
                      <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center">
                        {priceLoading ? (
                          <p className="text-lg text-gray-500">Loading price...</p>
                        ) : (
                          <>
                            <p className="text-3xl font-bold text-purple-600">{priceInfo.ergAmount.toFixed(2)} ERG</p>
                            <p className="text-sm text-gray-600 mt-1">= ${priceInfo.priceUsd.toFixed(2)} USD at current rate</p>
                            <p className="text-xs text-gray-500 mt-1">ERG Price: ${priceInfo.ergUsdPrice.toFixed(4)}</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-700 font-semibold mb-2">Send to this address:</p>
                      <div className="bg-gray-100 p-3 rounded-lg font-mono text-xs break-all mb-2 border-2 border-gray-300">
                        {WALLET_ADDRESS}
                      </div>
                      <button
                        onClick={() => copyToClipboard(WALLET_ADDRESS)}
                        className="text-purple-600 hover:text-purple-700 text-sm font-semibold flex items-center"
                      >
                        📋 Copy Address to Clipboard
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">How to Pay:</p>
                      <ol className="text-sm text-gray-700 space-y-2">
                        <li><strong>Using Nautilus Wallet:</strong>
                          <ol className="ml-4 mt-1 space-y-1">
                            <li>1. Open your Nautilus wallet extension</li>
                            <li>2. Click "Send"</li>
                            <li>3. Paste the address above</li>
                            <li>4. Enter amount: <strong>{priceInfo.ergAmount.toFixed(2)} ERG</strong></li>
                            <li>5. Confirm and send</li>
                          </ol>
                        </li>
                        <li className="mt-3"><strong>From CoinEx/KuCoin:</strong>
                          <p className="ml-4 mt-1">Go to Withdraw/Send → Select ERG → Paste address → Send {priceInfo.ergAmount.toFixed(2)} ERG</p>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                      <p className="text-xs text-gray-700">
                        💡 <strong>Don't have ERG yet?</strong> Click the button below to see how to get it!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transaction ID Submission */}
                <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
                  <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                    Submit Your Transaction ID
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    After sending the payment, copy your <strong>Transaction ID</strong> from your wallet and paste it below:
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Transaction ID</label>
                      <input
                        type="text"
                        placeholder="e.g., 4a3b2c1d5e6f7g8h9i0j..."
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Find this in your wallet under "Transactions" after sending
                      </p>
                    </div>
                    
                    <button
                      onClick={handleTransactionSubmit}
                      disabled={!transactionId}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✅ Verify Payment & Receive Parts 2-5
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 text-sm text-gray-600 bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">What happens next?</p>
                    <p className="mt-1">After verification, Parts 2-5 will be sent to <strong>{email}</strong> within 5 minutes. Check your inbox and spam folder!</p>
                  </div>
                </div>

                {/* Don't have ERG? Help section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
                  <h4 className="font-bold text-xl text-gray-900 mb-3 flex items-center">
                    <span className="mr-2">💡</span> Don't have ERG yet?
                  </h4>
                  <p className="text-gray-700 mb-4">No problem! Here's how to get it:</p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="text-2xl mb-2">🇺🇸</div>
                      <h5 className="font-bold text-gray-900 mb-2">US Residents</h5>
                      <p className="text-sm text-gray-600 mb-3">Buy ERG directly in Nautilus wallet with a credit card via Banxa (easiest!)</p>
                      <p className="text-xs text-gray-500">Time: 15 minutes</p>
                    </div>
                    
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="text-2xl mb-2">🌍</div>
                      <h5 className="font-bold text-gray-900 mb-2">International</h5>
                      <p className="text-sm text-gray-600 mb-3">Use CoinEx exchange - no KYC required for small amounts</p>
                      <p className="text-xs text-gray-500">Time: 20 minutes</p>
                    </div>
                    
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="text-2xl mb-2">🌐</div>
                      <h5 className="font-bold text-gray-900 mb-2">Worldwide</h5>
                      <p className="text-sm text-gray-600 mb-3">Use KuCoin exchange - available almost everywhere</p>
                      <p className="text-xs text-gray-500">Time: 30 minutes</p>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setCurrentPage('ergo')}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      📖 See detailed step-by-step instructions for all methods →
                    </button>
                  </div>

                  <div className="mt-4 bg-white border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600">
                      <strong>How much do I need?</strong> Buy about $20-25 worth of ERG. The book costs $15 USD (shown above in ERG), and the extra covers transaction fees.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {paymentStep === 'confirming' && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <h4 className="font-bold text-xl text-gray-900 mb-2">Verifying Transaction...</h4>
                <p className="text-gray-600">Please wait while we confirm your payment on the Ergo blockchain.</p>
                <p className="text-sm text-gray-500 mt-2">This usually takes 2-3 minutes (~1-2 block confirmations)</p>
              </div>
            )}
            
            {paymentStep === 'confirmed' && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-2xl text-gray-900 mb-2">Payment Confirmed! 🎉</h4>
                <p className="text-gray-600 mb-4">
                  Parts 2-5 have been sent to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Check your inbox (and spam folder) for your download links.
                </p>
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600">Transaction ID:</p>
                  <p className="font-mono text-xs text-gray-800 break-all">{transactionId}</p>
                </div>
                <div className="mt-6 bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    🙏 Thank you for supporting independent creators and decentralized commerce!
                  </p>
                  <p className="text-xs text-gray-600">
                    Powered by Ergo Blockchain
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Home page
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🚀 2026's Most Important Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Stop Managing Your Life.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Start Living It.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how autonomous AI agents can save you 15+ hours per week, reduce stress, 
            and handle the mental load of modern life—while protecting your privacy.
          </p>
        </div>

        {/* Book Preview */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-8 text-white shadow-xl">
                <div className="text-center">
                  <Book className="w-20 h-20 mx-auto mb-4 opacity-90" />
                  <h2 className="text-3xl font-bold mb-2">AGENTIC AI AT HOME</h2>
                  <p className="text-purple-100 mb-4">By Dr. Maya Patel</p>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                    <p className="text-sm">250+ Pages • 5 Parts • 15 Chapters • 2026 Edition</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn:</h3>
              <ul className="space-y-3">
                {[
                  'Set up your first AI agent in under 30 minutes',
                  'Automate morning routines, meals, and household tasks',
                  'Protect your privacy while using powerful AI tools',
                  'Build multi-agent systems that work together',
                  'Save $500+/month on groceries, subscriptions, utilities',
                  'Reduce decision fatigue and mental overwhelm',
                  'Prepare for the AI-powered home of 2026 and beyond'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Free Part 1 Offer */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white mb-12 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <Download className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Get Part 1 FREE!</h3>
            <p className="text-xl mb-6 text-green-50">
              Download the introduction and first 3 chapters (Understanding Agentic AI & Privacy) 
              completely free. See if this book is right for you!
            </p>
            <button
              onClick={handleGetFree}
              className="bg-white text-green-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-green-50 transition-colors shadow-lg"
            >
              Download Part 1 Free (No Email Required!)
            </button>
            <p className="text-sm text-green-100 mt-4">
              ~15,000 words • Chapters 1-3 • No strings attached
            </p>
          </div>
        </div>

        {/* Purchase Full Book */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Love Part 1? Get the Complete Book</h3>
            <p className="text-gray-600 mb-6">
              Purchase Parts 2-5 to unlock the full guide (Chapters 4-15 + Conclusion)
            </p>
            
            <div className="bg-purple-50 rounded-xl p-8 max-w-md mx-auto mb-6">
              {priceLoading ? (
                <div className="text-gray-500">Loading price...</div>
              ) : (
                <>
                  <div className="text-5xl font-bold text-purple-600 mb-2">
                    {priceInfo.ergAmount.toFixed(2)} ERG
                  </div>
                  <div className="text-gray-500 mb-4">
                    = ${priceInfo.priceUsd.toFixed(2)} USD
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Current ERG Price: ${priceInfo.ergUsdPrice.toFixed(4)} • Updates every 5 min
                  </div>
                </>
              )}
              
              <div className="text-sm text-gray-600 mb-4">
                <button
                  onClick={() => setCurrentPage('ergo')}
                  className="text-purple-600 hover:text-purple-700 font-semibold underline"
                >
                  Why Ergo? Learn about secure, low-fee payments →
                </button>
              </div>
              
              <input
                type="email"
                placeholder="Enter your email for delivery"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-purple-500"
              />
              
              <button
                onClick={handlePurchaseClick}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:shadow-xl transition-shadow mb-3"
              >
                Purchase the Complete Book (Instant Delivery)
              </button>

              <div className="text-xs text-gray-500">
                Parts 2-5 include Chapters 4-15: Morning Routines, Kitchen Management, 
                Household Operations, Email & Calendar, Work Productivity, Health Tracking, 
                Mental Health, Learning, Multi-Agent Systems, Smart Home, and The Future
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Secure blockchain payment • Instant delivery • Always $15 USD in ERG</span>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-purple-100">Hours Saved Per Week</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$500+</div>
              <div className="text-purple-100">Average Monthly Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-purple-100">Early Readers</div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: <Clock className="w-8 h-8" />,
              title: 'Get Your Time Back',
              description: 'Stop wasting hours on repetitive tasks. AI agents handle the mental load so you focus on what matters.'
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Privacy-First Approach',
              description: 'Learn to use AI agents without sacrificing privacy. Complete chapter on security and data control.'
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Save Money',
              description: 'Optimize spending on groceries, subscriptions, utilities. Readers save $500+ monthly on average.'
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: 'Start Immediately',
              description: 'Step-by-step guides for beginners. No coding required. Get your first agent running in 30 minutes.'
            }
          ].map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-purple-600 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 Dr. Maya Patel • Agentic AI at Home</p>
          <p className="text-sm text-gray-500 mt-2">For support: agenticaiathome@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
