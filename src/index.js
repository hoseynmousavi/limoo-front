import {createRoot} from "react-dom/client"
import "./styles/index.scss"
import App from "./App"
import registerSW from "./serviceWorkerRegistration"
import withRouter from "./seyed-modules/helpers/withRouter"
import ThemeProvider from "./seyed-modules/context/theme/ThemeReducer"
import AuthProvider from "./context/auth/AuthReducer"
import PackProvider from "./context/pack/PackReducer"
import CartProvider from "./context/cart/CartReducer"
import changeVariablesConstant from "./constant/changeVariablesConstant"

const root = createRoot(document.getElementById("root"))

const WrappedApp = withRouter(App)

root.render(
    <ThemeProvider changeVariables={changeVariablesConstant}>
        <AuthProvider>
            <CartProvider>
                <PackProvider>
                    <WrappedApp/>
                </PackProvider>
            </CartProvider>
        </AuthProvider>
    </ThemeProvider>,
)

registerSW()