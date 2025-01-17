import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import routesConfig from "../src/routes/routesConfig"
import { setupStore, RootState } from "../src/store/store";
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

export const renderWithProviders = (
    options = {
        initialEntries: ['/white-noise-app/'],
        initialIndex: 0,
    },
    preloadedState: Partial<RootState> = {}
) => {
    const testRouter = createMemoryRouter(routesConfig, {
        ...options,
        basename: '/white-noise-app/',
    });
    const testStore = setupStore(preloadedState);
    return {
        user: userEvent.setup(),
        ...render(
            <Provider store={testStore}>
                <RouterProvider router={testRouter} />
            </Provider>
        ),
    }
}
