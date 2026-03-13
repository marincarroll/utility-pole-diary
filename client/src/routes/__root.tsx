import {createRootRoute} from "@tanstack/react-router";
import Map from "../Map";
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: () => {
        return (
            <div>
                <Map/>
                <TanStackRouterDevtools/>
            </div>
        )
    }
})
