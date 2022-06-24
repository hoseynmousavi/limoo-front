import WizardBack from "../components/WizardBack"
import UserAvatar from "../components/UserAvatar"
import {AuthContext} from "../../context/auth/AuthReducer"
import {useContext} from "react"
import EditChildContentItem from "../components/EditChildContentItem"
import urlConstant from "../../constant/urlConstant"
import IconBtn from "../components/IconBtn"
import HeadphoneSvg from "../../media/svg/HeadphoneSvg"
import InfoSvg from "../../media/svg/InfoSvg"
import getUserFixName from "../../helpers/getUserFixName"
import EditSvg from "../../media/svg/EditSvg"
import SettingSvg from "../../media/svg/SettingSvg"
import OffSvg from "../../media/svg/OffSvg"
import logoutManager from "../../helpers/logoutManager"
import showPhoneNumber from "../../helpers/showPhoneNumber"
import textConstant from "../../constant/textConstant"
import GetTheme from "../../hooks/GetTheme"

function ShowProfile()
{
    const {isDark} = GetTheme()
    const {state: user} = useContext(AuthContext)

    function logout()
    {
        logoutManager.logout({sendLogoutReq: true})
    }

    return (
        <div className={`full-screen ${isDark ? "dark" : ""}`}>
            <div className="edit-child-profile-header">
                <WizardBack headerTile={textConstant.accountTitle} secondPadding/>
                <div className="edit-child-profile">
                    <UserAvatar className={`edit-child-profile-img ${isDark ? "dark" : ""}`} showLoginUser zoomable/>
                    <div className="home-detail-name parent">
                        {getUserFixName({user})}
                    </div>
                    <div className="home-detail-name-birth phone">{showPhoneNumber(user.phone)}</div>
                    <IconBtn title="ویرایش پروفایل" Icon={EditSvg} link={urlConstant.editInformation}/>
                </div>
            </div>
            <div className="edit-child-profile-footer">
                <div className="edit-child-devices-title child">
                    <div>درباره {process.env.REACT_APP_NAME}</div>
                </div>
                <div className="edit-child-content about">
                    <EditChildContentItem title={textConstant.setting} link={urlConstant.setting} Icon={SettingSvg} notArrow isSetting/>
                    <EditChildContentItem title={textConstant.support} Icon={HeadphoneSvg} notArrow isSetting/>
                    <EditChildContentItem title={`${textConstant.about}${process.env.REACT_APP_NAME}`} Icon={InfoSvg} iconColor notArrow isSetting/>
                    <EditChildContentItem title={textConstant.logout} Icon={OffSvg} notArrow isSetting haveAlert isLast onClick={logout}/>
                </div>
            </div>
        </div>
    )
}

export default ShowProfile