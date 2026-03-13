import {createRootRoute, Outlet} from "@tanstack/react-router";
import Map from "../Map";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: () => {
        return (
            <div>
                <Outlet />
                <TanStackRouterDevtools/>
            </div>
        )
    }
})
