import { screen, within } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('About', () => {
    it('Should render correct content on a page', () => {
        renderWithProviders({
            initialEntries: ['/about'],
            initialIndex: 0,
        });
        // Description
        expect(screen.getAllByRole('paragraph').some(p => p.textContent != null && p.textContent.length > 200)).toBe(true);
        // Github link
        expect(screen.getByRole('link', {name: /github/i})).toBeInTheDocument();
        // Attribution
        const creditLinks = within(screen.getByRole('list', {name: /credits/i})).getAllByRole('link');
        for (const link of creditLinks) {
            expect(link.getAttribute('href')).toMatch(/^https:\/\/freesound.org\/.*/i);
        }
    });
});
