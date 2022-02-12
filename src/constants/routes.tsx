
import {RouteObject} from "react-router-dom";
import HomePage from '../pages/home-page/HomePage'

let routes: RouteObject[] = [
    {
        path: "/",
        element: <HomePage />,
        // children: [
        //     { index: true, element: <HomePage /> },
        //     {
        //         path: "/courses",
        //         element: <HomePage />,
        //         children: [
        //             { index: true, element: <HomePage /> },
        //             { path: "/courses/:id", element: <HomePage /> }
        //         ]
        //     },
        //     { path: "*", element: <HomePage /> }
        // ]
    }
];



export default routes