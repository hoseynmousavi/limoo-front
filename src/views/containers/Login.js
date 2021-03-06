import Switch from "../components/Switch"
import Route from "../components/Route"
import urlConstant from "../../constant/urlConstant"
import LoginInputPhone from "./login/LoginInputPhone"
import LoginInputCode from "./login/LoginInputCode"

function Login()
{
    return (
        <Switch>
            <Route path={urlConstant.loginVerifyCode(":phone")} render={route => <LoginInputCode route={route}/>}/>
            <Route path="*" render={() => <LoginInputPhone/>}/>
        </Switch>
    )
}

export default Login