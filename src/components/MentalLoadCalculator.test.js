import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MentalLoadCalculator from './MentalLoadCalculator';
import { UserProvider } from '../context/UserContext';

// Mock the UserContext
const mockUnlockBadge = jest.fn();
const mockUserState = { persona: 'general' };

const renderWithContext = (component) => {
    return render(
        <UserProvider value={{ unlockBadge: mockUnlockBadge, userState: mockUserState }}>
            {component}
        </UserProvider>
    );
};

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
    },
}));

describe('MentalLoadCalculator', () => {
    beforeEach(() => {
        mockUnlockBadge.mockClear();
    });

    test('renders calculator inputs initially', () => {
        renderWithContext(<MentalLoadCalculator />);
        expect(screen.getByText(/Hours spent on email daily/i)).toBeInTheDocument();
        expect(screen.getByText(/Calculate My Mental Load/i)).toBeInTheDocument();
    });

    test('calculates Time Lord status (100% efficiency) for zero inputs', async () => {
        renderWithContext(<MentalLoadCalculator />);

        // Set all inputs to best possible values (0 hours, 0 tasks, rarely forget, low stress)
        // Note: Inputs are ranges, so we need to fire change events
        const emailInput = screen.getByLabelText(/Hours spent on email daily/i);
        fireEvent.change(emailInput, { target: { value: '0' } });

        const adminInput = screen.getByLabelText(/Hours spent on "life admin" weekly/i);
        fireEvent.change(adminInput, { target: { value: '0' } });

        const tasksInput = screen.getByLabelText(/Number of recurring tasks you track mentally/i);
        fireEvent.change(tasksInput, { target: { value: '0' } });

        const stressInput = screen.getByLabelText(/Stress level around managing daily life/i);
        fireEvent.change(stressInput, { target: { value: '1' } });

        // Click "Rarely" for forget frequency
        const rarelyButton = screen.getByText('rarely');
        fireEvent.click(rarelyButton);

        // Click Calculate
        const calculateButton = screen.getByText(/Calculate My Mental Load/i);
        fireEvent.click(calculateButton);

        // Expect Time Lord status
        await waitFor(() => {
            expect(screen.getByText(/Time Lord Status/i)).toBeInTheDocument();
            expect(screen.getByText(/🏆 Rank: TIME LORD/i)).toBeInTheDocument();
        });
    });

    test('calculates Critical Overload for high inputs', async () => {
        renderWithContext(<MentalLoadCalculator />);

        // Set inputs to high values
        const emailInput = screen.getByLabelText(/Hours spent on email daily/i);
        fireEvent.change(emailInput, { target: { value: '8' } });

        const adminInput = screen.getByLabelText(/Hours spent on "life admin" weekly/i);
        fireEvent.change(adminInput, { target: { value: '20' } });

        const stressInput = screen.getByLabelText(/Stress level around managing daily life/i);
        fireEvent.change(stressInput, { target: { value: '10' } });

        // Click Calculate
        const calculateButton = screen.getByText(/Calculate My Mental Load/i);
        fireEvent.click(calculateButton);

        // Expect Critical Overload
        await waitFor(() => {
            expect(screen.getByText(/Critical Overload/i)).toBeInTheDocument();
        });
    });
});
