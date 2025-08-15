import type { RouteObject } from "react-router-dom";
import { HomePage } from ".";

export const HOME_ROUTE:RouteObject[] = [
    {
        element: <HomePage />,
        path: "/",
    }
]