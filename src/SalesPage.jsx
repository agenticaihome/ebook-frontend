import React, { useState } from "react";
import {
  Check,
  Shield,
  Clock,
  Zap,
  ArrowRight,
  Download,
  Coins,
  Lock,
  Book,
  AlertCircle,
} from "lucide-react";

export default function SalesPage() {
  const [currentPage, setCurrentPage] = useState("home");
  const [email, setEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentStep, setPaymentStep] = useState("initial");

  const BOOK_PRICE_USD = 19.99;
  const ERG_PRICE_USD = 1.20; // Update dynamically if desired
  const BOOK_PRICE_ERG = (BOOK_PRICE_USD / ERG_PRICE_USD).toFixed(2);
  const WALLET_ADDRESS =
    "9gxmJ4attdDx1NnZL7tWkN2U9iwZbPWWSEcfcPHbJXc7xsLq6QK";

  /* ---------- COMPONENT WRAPPERS ---------- */

  const Section = ({ title, children }) => (
    <div className="max-w-2xl mx-auto my-8 p-6 border rounded-xl bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );

  const Dropdown = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="border rounded-lg mb-3 bg-gray-50">
        <button
          className="w-full text-left px-4 py-3 flex justify-between items-center font-medium"
          onClick={() => setOpen(!open)}
        >
          {title}
          <ArrowRight
            className={`transition-transform ${open ? "rotate-90" : ""}`}
          />
        </button>
        {open && <div className="px-4 pb-4 text-gray-700">{children}</div>}
      </div>
    );
  };

  /* ---------- MAIN PAGES ---------- */

  /* ---------- HOME PAGE (Above-the-fold optimization) ---------- */
  if (currentPage === "home") {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            Agentic AI at Home — Complete Book
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Learn how autonomous agents will save you 700+ hours a year — and
            transform your daily life.
          </p>

          <div className="text-3xl font-bold">
            ${BOOK_PRICE_USD}{" "}
            <span className="text-gray-500 text-lg">
              (≈ {BOOK_PRICE_ERG} ERG)
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Private · Worldwide · Instant Delivery
          </p>

          <button
            onClick={() => setCurrentPage("purchase")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center mx-auto shadow-md hover:bg-blue-700"
          >
            Buy with ERG <ArrowRight className="ml-2" />
          </button>

          {/* TRUST ICONS */}
          <div className="mt-6 flex justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Shield size={20} /> Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} /> Instant Delivery
            </div>
            <div className="flex items-center gap-2">
              <Lock size={20} /> No Personal Info
            </div>
          </div>

          {/* SOCIAL PROOF */}
          <div className="mt-8 text-gray-700 text-sm bg-gray-50 p-4 rounded-lg inline-block">
            ⭐ Trusted by readers in 31 countries — join them today.
          </div>
        </div>

        {/* WHY ERGO SECTION (Shortened + Friendlier) */}
        <Section title="Why ERG? (Quick Explanation)">
          <p className="mb-4 text-gray-700">
            ERG lets us sell the book with:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Instant global payments</li>
            <li>No middlemen, no account, no fees</li>
            <li>Total privacy — nothing stored</li>
            <li>Lower cost → lower book price</li>
          </ul>
        </Section>

        {/* CTA AGAIN */}
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentPage("purchase")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            Continue — Buy the Book
          </button>
        </div>
      </div>
    );
  }

  /* ---------- PURCHASE FLOW (Fast Lane + Slow Lane) ---------- */
  if (currentPage === "purchase") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Complete Your Purchase</h1>

        {/* PRICE */}
        <div className="text-xl font-semibold mb-4">
          ${BOOK_PRICE_USD}{" "}
          <span className="text-gray-500">(≈ {BOOK_PRICE_ERG} ERG)</span>
        </div>

        {/* FAST LANE */}
        <Section title="Fast Lane — Already Have ERG?">
          <p className="text-gray-700 mb-4">
            Send <strong>{BOOK_PRICE_ERG} ERG</strong> to the address below.
          </p>

          <div className="bg-gray-100 p-3 rounded-lg font-mono break-all">
            {WALLET_ADDRESS}
          </div>

          {/* TRANSACTION ID FIELD */}
          <div className="mt-4">
            <label className="font-medium">Enter Transaction ID:</label>
            <input
              className="w-full p-2 border rounded mt-1"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Paste transaction ID"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium">Your Email (for delivery):</label>
            <input
              className="w-full p-2 border rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <button
            onClick={() => setPaymentStep("completed")}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            Confirm Payment <Check className="ml-2" />
          </button>
        </Section>

        {/* SLOW LANE */}
        <Section title="Slow Lane — Need ERG? (Simple Steps)">
          <p className="text-gray-700 mb-4">
            Follow one of these simple paths:
          </p>

          {/* DROPDOWN 1 */}
          <Dropdown title="Fastest Method — Buy ERG on CoinEx">
            <ul className="list-disc pl-6 space-y-2">
              <li>Go to CoinEx</li>
              <li>Buy $20–25 worth of ERG</li>
              <li>Send ERG directly to the wallet address above</li>
            </ul>
          </Dropdown>

          {/* DROPDOWN 2 */}
          <Dropdown title="US Option — Nautilus Wallet + Banxa">
            <ul className="list-disc pl-6 space-y-2">
              <li>Install Nautilus wallet</li>
              <li>Buy ERG through Banxa</li>
              <li>Send required ERG amount</li>
            </ul>
          </Dropdown>

          {/* DROPDOWN 3 */}
          <Dropdown title="International Option — KuCoin">
            <ul className="list-disc pl-6 space-y-2">
              <li>Buy ERG on KuCoin</li>
              <li>Withdraw to wallet address above</li>
            </ul>
          </Dropdown>
        </Section>

        {/* GUARANTEE */}
        <div className="text-gray-700 text-sm mt-6 bg-gray-50 p-4 rounded-lg flex items-center gap-3">
          <Shield size={20} />
          100% Delivery Guarantee: If anything goes wrong, I personally send you
          the book.
        </div>

        {/* FINAL CTA */}
        <button
          onClick={() => setCurrentPage("home")}
          className="mt-6 text-blue-600 underline"
        >
          Back
        </button>

        {/* PAYMENT COMPLETE */}
        {paymentStep === "completed" && (
          <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-lg">
            <h2 className="text-xl font-bold text-green-800">
              Payment Submitted!
            </h2>
            <p className="text-green-700 mt-2">
              You’ll receive your book at <strong>{email}</strong> as soon as
              the ERG transaction is confirmed on the blockchain.
            </p>
          </div>
        )}
      </div>
    );
  }

  return null;
}
