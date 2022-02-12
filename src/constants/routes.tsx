import HomePage from "../pages/home-page/HomePage";
import {RouteObject} from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path:'/home',
        element: HomePage
    }
]


export default routes