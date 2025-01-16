import { screen } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('PageNotFound', () => {
    it('Should display error message and a link to home page if requested page was not found', () => {
        renderWithProviders({
            initialEntries: ['/incorrect-url'],
            initialIndex: 0,
        });
        expect(screen.getByText(/404|not found/i)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /home/i}).getAttribute('href')).toMatch(/.*\/$/);
    });

    it('Should take user back to home page after link was clicked', async () => {
        const { user } = renderWithProviders({
            initialEntries: ['/incorrect-url'],
            initialIndex: 0,
        });
        await user.click(screen.getByRole('link', {name: /home/i}));
        expect(window.location.pathname).toBe('/');
        expect(screen.queryByText(/404|not found/i)).not.toBeInTheDocument();
        expect(screen.getByRole('list', {name: /audio tracks/i})).toBeInTheDocument();
    });
});
