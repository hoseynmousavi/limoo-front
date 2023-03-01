import {lazy, useContext} from "react"
import ToastContainer from "./seyed-modules/components/ToastContainer"
import ThemeColorBar from "./seyed-modules/components/ThemeColorBar"
import Switch from "./seyed-modules/components/Switch"
import PrivateRoute from "./seyed-modules/components/PrivateRoute"
import urlConstant from "./constant/urlConstant"
import {AuthContext} from "./context/auth/AuthReducer"

const Login = lazy(() => import("./views/containers/Login"))
const Home = lazy(() => import("./views/containers/Home"))

function App()
{
    const {state: user} = useContext(AuthContext)
    return (
        <div id="index-temp" className="index-temp">
            <ThemeColorBar/>
            <Switch>
                <PrivateRoute user={user} redirectUrl={urlConstant.home} path={urlConstant.login} render={() => <Login/>} ifNotLogin dontChange/>
                <PrivateRoute user={user} redirectUrl={urlConstant.login} path="*" render={() => <Home/>}/>
            </Switch>
            <ToastContainer/>
        </div>
    )
}

export default App