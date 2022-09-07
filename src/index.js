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
import request from "./seyed-modules/request/request"
import AuthActions from "./context/auth/AuthActions"
import offlineSending from "./constant/offlineSending"

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

request.init({
    refreshFunc: AuthActions.getTokenWithRefreshToken,
    offlineSendingArr: offlineSending,
})

registerSW()