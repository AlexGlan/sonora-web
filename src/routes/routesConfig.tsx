import About from "../pages/About";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../components/RootLayout";

const routesConfig = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: '/about', element: <About /> }
        ],
        errorElement: <PageNotFound />
    }
];

export default routesConfig;
