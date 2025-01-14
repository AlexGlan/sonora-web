import { screen } from '@testing-library/react';
import { renderWithProviders } from "../test-utils";

describe('Home', () => {
    it('Should render correct content on a page', () => {
        renderWithProviders();
        // Header
        expect(screen.getByRole('navigation')).toBeInTheDocument();
        expect(screen.getByRole('heading')).toBeInTheDocument();
        // Global controls
        expect(screen.getByRole('button', {name: /reset/i})).toBeEnabled();
        expect(screen.getByRole('button', {name: /play all/i})).toBeEnabled();
        expect(screen.getByRole('slider', {name: /master volume/i})).toBeInTheDocument();
        // Audio collection
        expect(screen.getByRole('list', {name: /audio/i})).toBeInTheDocument();
        expect(screen.getAllByRole('slider', {name: /volume/i}).length).greaterThanOrEqual(2);
        expect(screen.getAllByRole('button', {name: /play/i}).length).greaterThanOrEqual(2);
    });
});
