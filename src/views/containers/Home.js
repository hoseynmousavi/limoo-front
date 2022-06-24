import Switch from "../components/Switch"
import {lazy} from "react"
import Route from "../components/Route"
import urlConstant from "../../constant/urlConstant"

const SettingPage = lazy(() => import("../pages/SettingPage"))
const ShowProfile = lazy(() => import("../pages/ShowProfile"))
const EditInformation = lazy(() => import("../pages/EditInformation"))
const HomePage = lazy(() => import("../pages/HomePage"))

function Home()
{
    return (
        <Switch>
            <Route path={urlConstant.setting} render={() => <SettingPage/>}/>
            <Route path={urlConstant.showProfile} render={() => <ShowProfile/>}/>
            <Route path={urlConstant.editInformation} render={route => <EditInformation route={route}/>}/>
            <Route exact path={urlConstant.home} render={() => <HomePage/>}/>
        </Switch>
    )
}

export default Home