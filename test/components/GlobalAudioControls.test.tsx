import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('GlobalAudioControls', () => {
    beforeEach(() => {
        // Mock audio playback since it's not supported in jsdom
        HTMLAudioElement.prototype.play = vi.fn();
        HTMLAudioElement.prototype.pause = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('Reset', () => {
        it('Should reset all audio track state', async () => {
            const { user } = renderWithProviders();
            const audioCollection = screen.getByRole('list', {name: /audio/i});
            let audioTracks = within(audioCollection).getAllByRole('listitem');
    
            for (const track of audioTracks) {
                // Change volume and playback of all tracks
                await user.click(within(track).getByRole('button', {name: /play/i}));
                fireEvent.change(within(track).getByRole('slider'), {target: {value: '100'}});
                // Assert that state has changed
                expect(within(track).queryByRole('button', {name: /pause/i})).toBeEnabled();
                expect(within(track).getByRole('slider')).toHaveValue('100');
                expect((within(track).getByRole('audio') as HTMLAudioElement).volume).toBe(1);
            }
    
            // Reset all tracks to initial state
            await user.click(screen.getByRole('button', {name: /reset/i}));
            audioTracks = within(audioCollection).getAllByRole('listitem');
            for (const track of audioTracks) {
                // Assert that state is back to initial value
                expect(within(track).getByRole('button', {name: /play/i})).toBeEnabled();
                expect(within(track).queryByRole('button', {name: /pause/i})).not.toBeInTheDocument();
                expect(within(track).getByRole('slider')).not.toHaveValue('100');
                expect((within(track).getByRole('audio') as HTMLAudioElement).volume).not.toBe(1);
            }
        });

        it('Should reset all global controls state', async () => {
            const { user } = renderWithProviders();
            // Change global controls values
            fireEvent.change(screen.getByRole('slider', {name: /master volume/i}), {target: {value: '100'}});
            await user.click(screen.getByRole('button', {name: /play all/i}));
            // Reset all state
            await user.click(screen.getByRole('button', {name: /reset/i}));
            expect(screen.getByRole('slider', {name: /master volume/i})).not.toHaveValue('100');
            expect(screen.getByRole('button', {name: /play all/i})).toBeEnabled();
            expect(screen.queryByRole('button', {name: /pause all/i})).not.toBeInTheDocument();
        })
    });

    describe('Global Playback', () => {
        it('Should control playback of all tracks where volume is greater than 0', async () => {
            const { user } = renderWithProviders();
            const audioCollection = screen.getByRole('list', {name: /audio/i});
            let audioTracks = within(audioCollection).getAllByRole('listitem');
    
            for (const track of audioTracks) {
                // Update all track volume to be greater than 0
                fireEvent.change(within(track).getByRole('slider'), {target: {value: '50'}});
            }
    
            // Play all tracks
            await user.click(screen.getByRole('button', {name: /play all/i}));
            audioTracks = within(audioCollection).getAllByRole('listitem');
            expect(screen.getByRole('button', {name: /pause all/i})).toBeEnabled();
            expect(screen.queryByRole('button', {name: /play all/i})).not.toBeInTheDocument();
            for (const track of audioTracks) {
                expect(within(track).getByRole('button', {name: /pause/i})).toBeEnabled();
            }
            // Pause all tracks
            await user.click(screen.getByRole('button', {name: /pause all/i}));
            audioTracks = within(audioCollection).getAllByRole('listitem');
            expect(screen.getByRole('button', {name: /play all/i})).toBeEnabled();
            expect(screen.queryByRole('button', {name: /pause all/i})).not.toBeInTheDocument();
            for (const track of audioTracks) {
                expect(within(track).getByRole('button', {name: /play/i})).toBeEnabled();
            }
        });

        it('Should skip tracks where volume is 0', async () => {
            const { user } = renderWithProviders();
            const audioCollection = screen.getByRole('list', {name: /audio/i});
            let audioTracks = within(audioCollection).getAllByRole('listitem');
    
            for (const track of audioTracks) {
                // Update all track volume to be exactly than 0
                fireEvent.change(within(track).getByRole('slider'), {target: {value: '0'}});
            }
    
            // Attempt to play all tracks
            await user.click(screen.getByRole('button', {name: /play all/i}));
            audioTracks = within(audioCollection).getAllByRole('listitem');
            expect(screen.getByRole('button', {name: /pause all/i})).toBeEnabled();
            for (const track of audioTracks) {
                // Should not be affected
                expect(within(track).getByRole('button', {name: /play/i})).toBeEnabled();
            }
            // Attempt to pause all tracks
            await user.click(screen.getByRole('button', {name: /pause all/i}));
            audioTracks = within(audioCollection).getAllByRole('listitem');
            expect(screen.getByRole('button', {name: /play all/i})).toBeEnabled();
            for (const track of audioTracks) {
                // Should not be affected
                expect(within(track).getByRole('button', {name: /play/i})).toBeEnabled();
            }
        });
    });

    describe('Master Volume Slider', () => {
        it ('Should control volume of all tracks where volume is greater than 0', () => {
            renderWithProviders();
            const audioCollection = screen.getByRole('list', {name: /audio/i});
            let audioTracks = within(audioCollection).getAllByRole('listitem');
    
            for (const track of audioTracks) {
                fireEvent.change(within(track).getByRole('slider'), {target: {value: '50'}});
            }
    
            fireEvent.change(screen.getByRole('slider', {name: /master volume/i}), {target: {value: '100'}});
            audioTracks = within(audioCollection).getAllByRole('listitem');
            for (const track of audioTracks) {
                expect(within(track).getByRole('slider')).toHaveValue('100');
                expect((within(track).getByRole('audio') as HTMLAudioElement).volume).toBe(1);
            }
        });
    
        it ('Should skip tracks where volume is 0', () => {
            renderWithProviders();
            const audioCollection = screen.getByRole('list', {name: /audio/i});
            let audioTracks = within(audioCollection).getAllByRole('listitem');
    
            fireEvent.change(screen.getByRole('slider', {name: /master volume/i}), {target: {value: '0'}});
            fireEvent.change(screen.getByRole('slider', {name: /master volume/i}), {target: {value: '100'}});
    
            audioTracks = within(audioCollection).getAllByRole('listitem');
            for (const track of audioTracks) {
                expect(within(track).getByRole('slider')).toHaveValue('0');
            }
        });
    
        it ('Should change volume of tracks even if their volume is 0 if they/`re currently playing', async () => {
            const { user } = renderWithProviders();
            const audioCollection = screen.getByRole('list', {name: /audio/i});
            let audioTracks = within(audioCollection).getAllByRole('listitem');
    
            for (const track of audioTracks) {
                fireEvent.change(within(track).getByRole('slider'), {target: {value: '50'}});
                await user.click(within(track).getByRole('button', {name: /play/i}));
            }
    
            fireEvent.change(screen.getByRole('slider', {name: /master volume/i}), {target: {value: '0'}});
            fireEvent.change(screen.getByRole('slider', {name: /master volume/i}), {target: {value: '100'}});
            audioTracks = within(audioCollection).getAllByRole('listitem');
            for (const track of audioTracks) {
                expect(within(track).getByRole('slider')).toHaveValue('100');
                expect((within(track).getByRole('audio') as HTMLAudioElement).volume).toBe(1);
            }
        });
    });
});
