import { screen } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('NavBar', () => {
    it('Should render route links for navigation', () => {
        renderWithProviders();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    });

    it('Should take user to another page when navigation link is clicked', async () => {
        const { user } = renderWithProviders();
        // Go to about page
        await user.click(screen.getByRole('link', { name: /about/i }));
        expect(screen.getByRole('list', {name: /credits/i})).toBeInTheDocument();
        // Go to home page
        await user.click(screen.getByRole('link', { name: /home/i }));
        expect(screen.getByRole('list', {name: /audio tracks/i})).toBeInTheDocument();
    });
});
