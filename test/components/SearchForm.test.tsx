import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('SearchForm', () => {
    const testTextQuery: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

    it('Should display a descriptive form label', () => {
        renderWithProviders();
        expect(screen.getByLabelText(/enter.*youtube/i)).toBeInTheDocument();
    });

    it('Should display a text input field that accepts user input', () => {
        renderWithProviders();
        const input: HTMLInputElement = screen.getByPlaceholderText(/youtube/i);
        expect(input).toHaveValue('');
        fireEvent.change(input, { target: { value: testTextQuery } });
        expect(input).toHaveValue(testTextQuery);
    });

    it('Should allow users to clear the search query using the clear button', async () => {
        const { user } = renderWithProviders();
        // Clear button should only appear when search query is not empty
        expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
        fireEvent.change(screen.getByPlaceholderText(/youtube/i), { target: { value: testTextQuery } });
        expect(screen.getByRole('button', { name: /clear/i })).toBeEnabled();
        // Clear the search query
        await user.click(screen.getByRole('button', { name: /clear/i }));
        expect(screen.getByPlaceholderText(/youtube/i)).toHaveValue('');
        expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    });

    it('Should display an error message when the input fails validation', async () => {
        const { user } = renderWithProviders();
        const submitBtn = screen.getByRole('button', { name: /search/i });
        // Attempt to submit an empty form
        await user.click(submitBtn);
        expect(screen.getByText(/(enter.*valid)|(empty)/i, { selector: 'strong' }));
        // Attempt to submit an incorrect link
        fireEvent.change(screen.getByPlaceholderText(/youtube/i), { target: { value: 'not a youtube link' } });
        await user.click(submitBtn);
        expect(screen.getByText(/(invalid)|(try again)/i, { selector: 'strong' }));
    });
});
