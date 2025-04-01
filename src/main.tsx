import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './routes/routesConfig';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/main.scss';

const router = createHashRouter(routesConfig);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
