import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('YoutubeVideoPlayer', () => {
    const url = 'https://www.youtube.com/watch?v=XXXXXXXXXXX';

    it('Should render an embedded video player after a valid url is submitted', async () => {
        const { user } = renderWithProviders();
        fireEvent.change(screen.getByPlaceholderText(/youtube/i), { target: { value: url } });
        await user.click(screen.getByRole('button', { name: /search/i }));
        expect(screen.getByTitle(/youtube.*player/i)).toBeInTheDocument();
    });
});
