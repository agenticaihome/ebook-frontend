import React, { useState } from "react";
import { Check, Shield, Clock, ArrowRight, Lock } from "lucide-react";

export default function SalesPage() {
  const [currentPage, setCurrentPage] = useState("home");
  const [email, setEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentStep, setPaymentStep] = useState("initial");

  const BOOK_PRICE_USD = 19.99;
  const ERG_PRICE_USD = 1.2; // Update dynamically if desired
  const BOOK_PRICE_ERG = (BOOK_PRICE_USD / ERG_PRICE_USD).toFixed(2);
  const WALLET_ADDRESS =
    "9gxmJ4attdDx1NnZL7tWkN2U9iwZbPWWSEcfcPHbJXc7xsLq6QK";

  /* ---------- SMALL UI HELPERS ---------- */

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
          type="button"
          className="w-full text-left px-4 py-3 flex justify-between items-center font-medium"
          onClick={() => setOpen(!open)}
        >
          {title}
          <ArrowRight
            className={`transition-transform ${open ? "rotate-90" : ""}`}
            size={18}
          />
        </button>
        {open && <div className="px-4 pb-4 text-gray-700">{children}</div>}
      </div>
    );
  };

  /* ---------- HOME PAGE ---------- */

  if (currentPage === "home") {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            Agentic AI at Home — Complete Book
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Learn how autonomous agents will save you 700+ hours a year — and
            transform your daily life with clear, simple steps.
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
            type="button"
            onClick={() => setCurrentPage("purchase")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center mx-auto shadow-md hover:bg-blue-700"
          >
            Buy with ERG <ArrowRight className="ml-2" size={18} />
          </button>

          {/* TRUST ICONS */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Shield size={18} /> Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} /> Instant Delivery
            </div>
            <div className="flex items-center gap-2">
              <Lock size={18} /> No Personal Info
            </div>
          </div>

          {/* SOCIAL PROOF */}
          <div className="mt-8 text-gray-700 text-sm bg-gray-50 p-4 rounded-lg inline-block">
            ⭐ Trusted by readers building their first AI agents at home.
          </div>
        </div>

        {/* WHY ERGO SECTION (SHORT, REASSURING) */}
        <Section title="Why ERG? (Quick Explanation)">
          <p className="mb-4 text-gray-700">
            ERG lets us sell this book in a way that’s:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Instant and global — works from almost anywhere</li>
            <li>Private — no credit card or personal data</li>
            <li>Low-fee — we keep costs down, you pay less</li>
            <li>Simple — send ERG, receive your book, done</li>
          </ul>
        </Section>

        {/* CTA AGAIN */}
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setCurrentPage("purchase")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            Continue — Buy the Book with ERG
          </button>
        </div>
      </div>
    );
  }

  /* ---------- PURCHASE PAGE ---------- */

  if (currentPage === "purchase") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Complete Your Purchase</h1>

        {/* PRICE DISPLAY */}
        <div className="text-xl font-semibold mb-4">
          ${BOOK_PRICE_USD}{" "}
          <span className="text-gray-500">(≈ {BOOK_PRICE_ERG} ERG)</span>
        </div>

        {/* FAST LANE — ALREADY HAVE ERG */}
        <Section title="Fast Lane — Already Have ERG?">
          <p className="text-gray-700 mb-4">
            Send <strong>{BOOK_PRICE_ERG} ERG</strong> to the address below.
            Then paste your transaction ID and email so we can deliver your
            book.
          </p>

          <div className="bg-gray-100 p-3 rounded-lg font-mono break-all text-sm">
            {WALLET_ADDRESS}
          </div>

          <div className="mt-4">
            <label className="font-medium text-sm">
              Transaction ID (Tx ID)
            </label>
            <input
              className="w-full p-2 border rounded mt-1 text-sm"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Paste your ERG transaction ID here"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium text-sm">Your Email</label>
            <input
              className="w-full p-2 border rounded mt-1 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <button
            type="button"
            onClick={() => setPaymentStep("completed")}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm font-semibold"
          >
            Confirm Payment <Check className="ml-2" size={18} />
          </button>
        </Section>

        {/* SLOW LANE — NEED ERG */}
        <Section title="Need ERG First? (Simple Options)">
          <p className="text-gray-700 mb-4 text-sm">
            Choose one of these paths — they all end the same way: you send ERG
            to the address above, and get your book instantly.
          </p>

          <Dropdown title="Fastest — Buy ERG on CoinEx (No Wallet Needed)">
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Go to CoinEx and create an account (if you don’t have one).</li>
              <li>Buy ~$20–25 worth of ERG.</li>
              <li>
                Withdraw/send your ERG directly to the wallet address shown
                above.
              </li>
              <li>
                Copy the transaction ID (Tx ID) and paste it into the box
                above, add your email, and confirm.
              </li>
            </ul>
          </Dropdown>

          <Dropdown title="US Option — Nautilus Wallet + Banxa">
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Install the Nautilus wallet browser extension.</li>
              <li>Create a wallet and safely back up your seed phrase.</li>
              <li>Use the Banxa on-ramp inside Nautilus to buy ERG.</li>
              <li>Send {BOOK_PRICE_ERG} ERG to the address shown above.</li>
              <li>
                Paste the transaction ID + your email, then hit “Confirm
                Payment”.
              </li>
            </ul>
          </Dropdown>

          <Dropdown title="International Option — KuCoin">
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li>Sign up for KuCoin.</li>
              <li>Buy ERG using your preferred funding method.</li>
              <li>Withdraw ERG to the wallet address shown above.</li>
              <li>
                Copy the transaction ID, paste it here, add your email, and
                confirm.
              </li>
            </ul>
          </Dropdown>
        </Section>

        {/* GUARANTEE / TRUST */}
        <div className="text-gray-700 text-sm mt-6 bg-gray-50 p-4 rounded-lg flex items-center gap-3">
          <Shield size={18} />
          <span>
            <strong>100% Delivery Guarantee:</strong> If anything goes wrong
            with your payment, I personally make sure you receive the book.
          </span>
        </div>

        {/* BACK LINK */}
        <button
          type="button"
          onClick={() => setCurrentPage("home")}
          className="mt-6 text-blue-600 underline text-sm"
        >
          ← Back to overview
        </button>

        {/* PAYMENT COMPLETED MESSAGE */}
        {paymentStep === "completed" && (
          <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-lg">
            <h2 className="text-xl font-bold text-green-800">
              Payment Submitted!
            </h2>
            <p className="text-green-700 mt-2 text-sm">
              Once your ERG transaction is confirmed on the blockchain, your
              book will be sent to <strong>{email || "your email"}</strong>.
              If you don’t see it, check spam/promotions — and you can always
              reach out with your Tx ID for help.
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ---------- FALLBACK (shouldn't hit) ---------- */
  return null;
}
