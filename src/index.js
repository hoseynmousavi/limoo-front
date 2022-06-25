import {createRoot} from "react-dom/client"
import "./styles/index.scss"
import App from "./App"
import registerSW from "./serviceWorkerRegistration"
import withRouter from "./views/containers/withRouter"
import ThemeProvider from "./context/theme/ThemeReducer"
import AuthProvider from "./context/auth/AuthReducer"
import PackProvider from "./context/pack/PackReducer"

const root = createRoot(document.getElementById("root"))

const WrappedApp = withRouter(App)

root.render(
    <ThemeProvider>
        <AuthProvider>
            <PackProvider>
                <WrappedApp/>
            </PackProvider>
        </AuthProvider>
    </ThemeProvider>,
)

registerSW()