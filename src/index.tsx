import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import Main from "./pages/main"
import Project from "./pages/project"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "projects/:projectId",
        element: <Project />,
    },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
)
