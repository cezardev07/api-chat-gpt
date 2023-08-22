import { Header } from "./components/header/index.tsx"
import { RoutesPage } from "./routes/routes.tsx"
import { Provider } from "./context/provider.tsx";

import { BrowserRouter } from "react-router-dom";

export const App = () => {
    return(
        <Provider>
            <BrowserRouter>
                <Header/>
                <main className="pt-24 pl-2 pr-2 w-full min-h-full">
                    <RoutesPage/>
                </main>
            </BrowserRouter>
        </Provider>
    )
}