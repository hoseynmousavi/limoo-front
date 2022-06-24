import {createRoot} from "react-dom/client"
import "./styles/index.scss"
import App from "./App"
import registerSW from "./serviceWorkerRegistration"
import withRouter from "./views/containers/withRouter"
import ThemeProvider from "./context/theme/ThemeReducer"
import AuthProvider from "./context/auth/AuthReducer"

const root = createRoot(document.getElementById("root"))

const WrappedApp = withRouter(App)

root.render(
    <ThemeProvider>
        <AuthProvider>
            <WrappedApp/>
        </AuthProvider>
    </ThemeProvider>,
)

registerSW()