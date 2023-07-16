import Cart from "../Pages/Cart";
import Detail from "../Pages/Detail";
import Fragrances from "../Pages/Fragrances";
import Groceries from "../Pages/Groceries";
import Home from "../Pages/Home";
import HomeDecoration from "../Pages/HomeDecoration";
import Laptop from "../Pages/Laptop";
import LayoutDefault from "../Pages/Layout/LayoutDefault";
import Skincare from "../Pages/Skincare";

export const routes = [
    {
        path : "/",
        element : <LayoutDefault/>,
        children : [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/cart",
                element: <Cart/>
            },
            {
                path: "/detail/:id",
                element: <Detail/>
            },
            {
                path: "/laptop",
                element: <Laptop/>
            },
            {
                path: "/fragrances",
                element: <Fragrances/>
            },
            {
                path: "/skincare",
                element: <Skincare/>
            },
            {
                path: "/groceries",
                element: <Groceries/>
            },
            {
                path: "/home-decoration",
                element: <HomeDecoration/>
            },
        ]
    }
]