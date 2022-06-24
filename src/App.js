import {lazy} from "react"
import ToastContainer from "./views/containers/ToastContainer"
import ThemeColorBar from "./views/components/ThemeColorBar"
import Switch from "./views/components/Switch"
import PrivateRoute from "./views/components/PrivateRoute"
import urlConstant from "./constant/urlConstant"

const Login = lazy(() => import("./views/containers/Login"))
const Home = lazy(() => import("./views/containers/Home"))

function App({location})
{
    return (
        <div id="index-temp" className="index-temp">
            <ThemeColorBar/>
            <Switch isAuth>
                <PrivateRoute ifNotLogin dontChange path={urlConstant.login} render={() => <Login/>}/>
                <PrivateRoute path="*" render={() => <Home/>}/>
            </Switch>
            <ToastContainer location={location}/>
        </div>
    )
}

export default App