import { render, fireEvent } from '@testing-library/react';
import AddBabyDetails from './AddBabyDetails';

describe('AddBabyDetails', () => {
    test('toggles birth details when button is clicked', () => {
        const { getByRole, getByText } = render(<AddBabyDetails />);
        const toggleBirthDetailsButton = getByRole('button', { name: 'Add Birth Details' });
        fireEvent.click(toggleBirthDetailsButton);
        const birthDetailsText = getByText(/Birth Details/);
        expect(birthDetailsText).toBeInTheDocument();
    });
});
