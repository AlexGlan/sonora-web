import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";

const routesConfig = [
    {
        path: '/',
        element: <Home />,
        errorElement: <PageNotFound />
    },

];

export default routesConfig;
