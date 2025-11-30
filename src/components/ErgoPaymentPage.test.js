import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ErgoPaymentPage from '../ErgoPaymentPage';
import { api } from '../services/api';
import { BrowserRouter } from 'react-router-dom';

// Mock API
jest.mock('../services/api');

// Mock Navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock QRCode
jest.mock('qrcode.react', () => ({
    QRCodeSVG: () => <div data-testid="qr-code">QR Code</div>,
}));

// Mock Toast
jest.mock('react-hot-toast', () => ({
    toast: {
        loading: jest.fn(),
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe('ErgoPaymentPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockNavigate.mockClear();
    });

    test('initializes payment on mount', async () => {
        api.initiateErgoPayment.mockResolvedValue({
            success: true,
            accessCode: 'TEST_CODE',
            walletAddress: 'test_addr',
            ergAmount: 10.5,
            ergPriceUsd: 2.0,
            ergoPayUrl: 'ergopay://test',
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <ErgoPaymentPage />
                </BrowserRouter>
            );
        });

        // Should show loading initially
        // Then show step 1 (Proceed to Payment)
        await waitFor(() => {
            expect(screen.getByText(/\$19.99/i)).toBeInTheDocument();
            expect(screen.getByText(/≈ 10.5000 ERG/i)).toBeInTheDocument();
        });
    });

    test('completes payment flow manually', async () => {
        api.initiateErgoPayment.mockResolvedValue({
            success: true,
            accessCode: 'TEST_CODE',
            walletAddress: 'test_addr',
            ergAmount: 10.5,
            ergPriceUsd: 2.0,
            ergoPayUrl: 'ergopay://test',
        });

        api.checkRecentErgoPayment.mockResolvedValue({
            success: true,
            status: 'PAID',
            transactionId: 'tx_123',
        });

        await act(async () => {
            render(
                <BrowserRouter>
                    <ErgoPaymentPage />
                </BrowserRouter>
            );
        });

        // Click Proceed
        const proceedBtn = await screen.findByText(/Proceed to Payment/i);
        fireEvent.click(proceedBtn);

        // Should see manual check button
        const checkBtn = await screen.findByText(/I've Sent the Payment/i);
        expect(checkBtn).toBeInTheDocument();

        // Click Check
        await act(async () => {
            fireEvent.click(checkBtn);
        });

        // Should show success state
        await waitFor(() => {
            expect(screen.getByText(/Payment Verified/i)).toBeInTheDocument();
        });

        // Should navigate
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/create-account?payment_id=tx_123'));
        }, { timeout: 3000 });
    });
});
