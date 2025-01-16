import About from "../pages/About";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";

const routesConfig = [
    {
        path: '/',
        element: <Home />,
        errorElement: <PageNotFound />
    },
    {
        path: '/about',
        element: <About />,
    },
];

export default routesConfig;
