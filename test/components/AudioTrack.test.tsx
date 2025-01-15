import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('AudioTrack', () => {
    beforeEach(() => {
        // Mock audio playback since it's not supported in jsdom
        HTMLAudioElement.prototype.play = vi.fn();
        HTMLAudioElement.prototype.pause = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('Should toggle play/pause state when playback button is clicked', async () => {
        const { user } = renderWithProviders();
        const audioCollection = screen.getByRole('list', {name: /audio/i});
        let audioTrack = within(audioCollection).getAllByRole('listitem')[1];

        await user.click(within(audioTrack).getByRole('button', {name: /play/i}));
        // Should show pause button
        audioTrack = within(audioCollection).getAllByRole('listitem')[1];
        expect(within(audioTrack).getByRole('button', {name: /pause/i})).toBeEnabled();
        expect(within(audioTrack).queryByRole('button', {name: /play/i})).not.toBeInTheDocument();

        await user.click(within(audioTrack).getByRole('button', {name: /pause/i}));
        // Should show play button
        audioTrack = within(audioCollection).getAllByRole('listitem')[1];
        expect(within(audioTrack).getByRole('button', {name: /play/i})).toBeEnabled();
        expect(within(audioTrack).queryByRole('button', {name: /pause/i})).not.toBeInTheDocument();
    });

    it('Should play and pause audio when playback button is clicked', async () => {
        const { user } = renderWithProviders();
        const audioCollection = screen.getByRole('list', {name: /audio/i});
        let audioTrack = within(audioCollection).getAllByRole('listitem')[1];
        // Assert that audio element playback functions are mocked
        expect(HTMLAudioElement.prototype.play).toHaveProperty('mock');
        expect(HTMLAudioElement.prototype.pause).toHaveProperty('mock');

        await user.click(within(audioTrack).getByRole('button', {name: /play/i}));
        // Should start audio playback
        audioTrack = within(audioCollection).getAllByRole('listitem')[1];
        expect(HTMLAudioElement.prototype.play).toHaveBeenCalledOnce();
        
        await user.click(within(audioTrack).getByRole('button', {name: /pause/i}));
        // Should stop audio playback
        audioTrack = within(audioCollection).getAllByRole('listitem')[1];
        expect(HTMLAudioElement.prototype.pause).toHaveBeenCalledOnce();
    });

    it('Should change audio volume when slider value changes', () => {
        renderWithProviders();
        const audioCollection = screen.getByRole('list', {name: /audio/i});
        const audioTrack = within(audioCollection).getAllByRole('listitem')[1];
        let volumeSlider = within(audioTrack).getByRole('slider', {name: /volume/i});        
        expect(volumeSlider).toHaveValue('0');

        fireEvent.change(volumeSlider, {target: {value: '25'}});
        volumeSlider = within(audioTrack).getByRole('slider', {name: /volume/i});
        expect(volumeSlider).toHaveValue('25');
        expect((within(audioTrack).getByRole('audio') as HTMLAudioElement).volume).toBe(0.25);
    });

    it('Should not change audio volume when playback button is clicked"', async () => {
        const { user } = renderWithProviders();
        const audioCollection = screen.getByRole('list', {name: /audio/i});
        const audioTrack = within(audioCollection).getAllByRole('listitem')[1];
        let volumeSlider = within(audioTrack).getByRole('slider', {name: /volume/i});

        fireEvent.change(volumeSlider, {target: {value: '25'}});
        // Play audio
        await user.click(within(audioTrack).getByRole('button', {name: /play/i}));
        volumeSlider = within(audioTrack).getByRole('slider', {name: /volume/i});
        expect(volumeSlider).toHaveValue('25');
        expect((within(audioTrack).getByRole('audio') as HTMLAudioElement).volume).toBe(0.25);  
        // Pause audio
        await user.click(within(audioTrack).getByRole('button', {name: /pause/i}));
        volumeSlider = within(audioTrack).getByRole('slider', {name: /volume/i});
        expect(volumeSlider).toHaveValue('25');
        expect((within(audioTrack).getByRole('audio') as HTMLAudioElement).volume).toBe(0.25);
    });
});
