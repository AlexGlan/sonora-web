import { screen, within } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('AudioCollection', () => {
    it('Should render a list of audio tracks', () => {
        renderWithProviders();
        const audioList = screen.getByRole('list', {name: /audio/i});
        const audioTracks = within(audioList).getAllByRole('listitem');
        audioTracks.forEach(track => {
            expect(within(track).getByRole('img')).toBeInTheDocument();
            expect(within(track).getByText(/[a-z].*/i))
            expect(within(track).getByRole('button', {name: /play/i})).toBeEnabled();
            expect(within(track).getByRole('slider', {name: /volume/i})).toBeInTheDocument();
            expect(within(track).getByRole('audio')).toBeInTheDocument();
        });
    });
});
