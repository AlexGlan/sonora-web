import { screen, within } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";
import audioData from '../mocks/audioData.mock.json';
import { server } from '../mocks/node.ts';
import { http, HttpResponse } from 'msw';

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

    it('Should load and render additional audio tracks when the data fetching button is clicked', async () => {
        const { user } = renderWithProviders();

        await user.click(screen.getByRole('button', { name: /load/i }));
        // Should show toast notification
        expect(screen.getByRole('alert')).toBeInTheDocument();

        const audioList = screen.getByRole('list', {name: /audio/i});
        const audioTracks = within(audioList).getAllByRole('listitem');

        expect(audioTracks.length).toBe(audioData.data.length);
        audioTracks.forEach((track, i) => {
            const name = within(track).getByText(/[a-z].*/i);
            expect(name).toHaveTextContent(audioData.data[i].name);
            const audio = within(track).getByRole('audio') as HTMLAudioElement;
            expect(audio.src).toBe(audioData.data[i].audioSrc);
        });
    });

    it('Should display an error message when request fails', async () => {
        const { user } = renderWithProviders();
        // Mock an error response
        server.use(http.get('https://sonora-api-2oow.onrender.com/api/audio', () => {
            return HttpResponse.json({ error: 'Server error' }, { status: 500 });
        }));

        await user.click(screen.getByRole('button', { name: /load/i }));
        // Should show error message
        expect(screen.getByText(/unable|error/i)).toBeInTheDocument();
        // Should show toast notification
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });
});
