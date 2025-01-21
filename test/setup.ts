import '@testing-library/jest-dom/vitest';

beforeAll(() => {
    // Mock canvas context to suppress warnings in test environment
    HTMLCanvasElement.prototype.getContext = vi.fn();
});

afterAll(() => {
    vi.resetAllMocks();
});
