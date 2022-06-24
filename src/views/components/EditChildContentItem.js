import KeyboardArrowSvg from "../../media/svg/KeyboardArrowSvg"
import Material from "./Material"
import Link from "./Link"
import MyLoader from "./MyLoader"
import createMaterialColor from "../../helpers/createMaterialColor"
import SwitchKey from "./SwitchKey"

function EditChildContentItem({title, desc, Icon, link, isLast, isLoading, notArrow, isSetting, haveAlert, iconColor, onClick, haveSwitch, switchOn})
{
    return (
        <Link to={link} onClick={onClick}>
            <Material className={`edit-child-content-item ${isSetting ? "setting" : ""} ${isLast ? "last-child" : ""}`} backgroundColor={haveAlert && createMaterialColor({variable: "--toast-fail-text"})}>
                <Icon className={`edit-child-content-item-svg ${iconColor ? "icon-color" : haveAlert ? "alert" : ""}`}/>
                <div className="edit-child-content-item-text">
                    <div className="edit-child-content-item-text-main">
                        <div className={`edit-child-content-item-text-main-title ${haveAlert ? "alert" : ""}`}>{title}</div>
                        {
                            (isLoading || desc) &&
                            <div className="edit-child-content-item-text-main-desc">
                                {
                                    isLoading ?
                                        <MyLoader width={18} className="edit-child-content-item-text-main-loading"/>
                                        :
                                        desc && desc
                                }
                            </div>
                        }
                    </div>
                    {
                        !notArrow ?
                            haveSwitch ?
                                <SwitchKey isOn={switchOn}/>
                                :
                                <KeyboardArrowSvg className="edit-child-content-item-text-svg"/>
                            :
                            null
                    }
                </div>
            </Material>
        </Link>
    )
}

export default EditChildContentItem