import '@testing-library/jest-dom/vitest';
import { server } from './mocks/node.ts';

beforeAll(() => {
    // Mock canvas context to suppress warnings in test environment
    HTMLCanvasElement.prototype.getContext = vi.fn();
    // Start mock API server to handle requests in tests
    server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
    // Reset handlers after each test for test isolation
    server.resetHandlers();
});

afterAll(() => {
    vi.resetAllMocks();
    // Close server after all tests
    server.close();
});
