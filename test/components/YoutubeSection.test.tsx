import { screen } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('YoutubeSection', () => {
    it('Should render the correct section layout and content on initial render', () => {
        renderWithProviders();
        // Header and subhead
        expect(screen.getByText(/play.*youtube/i, {selector: 'span'}));
        expect(screen.getByText(/youtube/i, {selector: 'p'}));
        // Search form
        expect(screen.getByPlaceholderText(/youtube/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /search/i})).toBeEnabled();
        // Should not display embedded video player
        expect(screen.queryByTitle(/youtube.*player/i)).not.toBeInTheDocument();
    });
});
