import Switch from "../components/Switch"
import LoginInputPhone from "../containers/LoginInputPhone"
import LoginInputCode from "../containers/LoginInputCode"
import urlConstant from "../../constant/urlConstant"
import Route from "../components/Route"

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