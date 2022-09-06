import Switch from "../../seyed-modules/components/Switch"
import {lazy} from "react"
import Route from "../../seyed-modules/components/Route"
import urlConstant from "../../constant/urlConstant"

const SettingPage = lazy(() => import("../pages/SettingPage"))
const ShowProfilePage = lazy(() => import("../pages/ShowProfilePage"))
const EditInformationPage = lazy(() => import("../pages/EditInformationPage"))
const ReviewCartsPage = lazy(() => import("../pages/ReviewCartsPage"))
const HomePage = lazy(() => import("../pages/HomePage"))

function Home()
{
    return (
        <Switch>
            <Route path={urlConstant.setting} render={() => <SettingPage/>}/>
            <Route path={urlConstant.showProfile} render={() => <ShowProfilePage/>}/>
            <Route path={urlConstant.editInformation} render={route => <EditInformationPage route={route}/>}/>
            <Route path={urlConstant.reviewCarts} render={() => <ReviewCartsPage/>}/>
            <Route exact path={urlConstant.home} render={() => <HomePage/>}/>
        </Switch>
    )
}

export default Home