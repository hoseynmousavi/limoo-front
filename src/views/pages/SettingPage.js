import WizardBack from "../components/WizardBack"
import EditChildContentItem from "../components/EditChildContentItem"
import {useRef} from "react"
import NotificationSvg from "../../media/svg/NotificationSvg"
import textConstant from "../../constant/textConstant"
import SettingChangeTheme from "../containers/setting/SettingChangeTheme"

function SettingPage()
{
    const contRef = useRef(null)
    return (
        <div className="edit-child" ref={contRef}>
            <WizardBack title={textConstant.setting} secondPadding/>
            <div className="edit-child-content setting">
                <EditChildContentItem title={textConstant.settingNotification} desc={textConstant.settingNotificationDesc} Icon={NotificationSvg} isLoading={false}/>
                <SettingChangeTheme contRef={contRef}/>
            </div>
        </div>
    )
}

export default SettingPage