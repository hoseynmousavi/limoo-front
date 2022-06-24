import Material from "./Material"
import createMaterialColor from "../../helpers/createMaterialColor"
import AuthActions from "../../context/auth/AuthActions"
import {useContext, useEffect, useState} from "react"
import {AuthContext} from "../../context/auth/AuthReducer"
import UserAvatar from "./UserAvatar"
import CircleProgress from "./CircleProgress"
import toastManager from "../../helpers/toastManager"
import {SUCCESS_TOAST} from "../../constant/toastTypes"
import toastConstant from "../../constant/toastConstant"
import TrashSvg from "../../media/svg/TrashSvg"
import goBack from "../../helpers/goBack"
import GallerySvg from "../../media/svg/GallerySvg"
import CameraSvg from "../../media/svg/CameraSvg"
import CheckUserMedia from "../../hooks/CheckUserMedia"
import getImageLink from "../../helpers/getImageLink"
import GetTheme from "../../hooks/GetTheme"
import VerticalPanel from "./VerticalPanel"
import CropImage from "./CropImage"

function EditAvatar({showLoginUser, avatar, avatarClassName, label, icon, removeButton, link, getRef, isChild})
{
    const {isDark} = GetTheme()
    const {state: user, dispatch} = useContext(AuthContext)
    const [avatarTemp, setAvatarTemp] = useState(null)
    const [isShowMenu, setIsShowMenu] = useState(null)
    const [uploadLoading, setUploadLoading] = useState(0)
    const showLoading = uploadLoading < 100 && uploadLoading > 0

    useEffect(() =>
    {
        if (getRef) getRef(uploadAvatar)
        // eslint-disable-next-line
    }, [])

    function onFileChange(e)
    {
        const avatar = e.target.files[0]
        e.target.value = ""
        goBack()
        setTimeout(() => setAvatarTemp(avatar), 10)
    }

    function closeCrop()
    {
        setAvatarTemp(null)
    }

    function showMenu()
    {
        setIsShowMenu(true)
    }

    function hideMenu()
    {
        setIsShowMenu(false)
    }

    function uploadAvatar(avatar)
    {
        setUploadLoading(1)
        AuthActions.editAvatar({avatar, dispatch, progress: percent => percent < 100 && setUploadLoading(percent)})
            .then(avatar =>
            {
                toastManager.addToast({message: toastConstant.editAvatarSuccess, type: SUCCESS_TOAST})
                const img = new Image()
                img.src = getImageLink(avatar)
                img.onload = () =>
                {
                    setUploadLoading(100)
                    setTimeout(() => setUploadLoading(0), 250)
                }
            })
            .catch(() =>
            {
                setUploadLoading(0)
            })
    }

    function removeAvatar()
    {
        goBack()
        setTimeout(() =>
        {
            AuthActions.editAvatar({dispatch}).then(() => toastManager.addToast({message: toastConstant.removeAvatarSuccess, type: SUCCESS_TOAST}))
        }, 10)
    }

    function onBtnClick()
    {
        if (removeButton) removeButton()
        else if (link) window.history.pushState("", "", link)
        else showMenu()
    }

    return (
        <>
            <div className={`login-image-edit-cont ${avatarClassName}`}>
                <UserAvatar havePadding={showLoading} isActive={isChild && showLoading} childLoadingOpacity={showLoading ? "1" : "0"} childLoading={uploadLoading} isChild={isChild} className={`login-image-edit ${isDark ? "dark" : ""} ${showLoading ? isChild ? "child-loading" : "parent-loading" : ""}`} showLoginUser={showLoginUser} avatar={avatar}/>
                {!isChild && <CircleProgress opacity={showLoading ? "1" : "0"} percent={uploadLoading}/>}
            </div>
            <Material disable={showLoading} className="login-image-edit-btn" backgroundColor={createMaterialColor({variable: removeButton ? "--toast-fail-text" : "--link-color"})} onClick={onBtnClick}>
                {
                    removeButton ?
                        <>
                            <TrashSvg className="login-image-edit-remove"/>
                            <div className="login-image-edit-title-remove">حذف تصویر</div>
                        </>
                        :
                        <>
                            {icon && icon}
                            {label}
                        </>
                }
            </Material>
            {
                avatarTemp &&
                <CropImage file={avatarTemp} onChange={uploadAvatar} closeCrop={closeCrop}/>
            }
            {
                isShowMenu &&
                <VerticalPanel close={hideMenu}>
                    <div className="select-title">{label}</div>
                    <div className="select-items-cont">
                        <label>
                            <Material isDiv className="select-item have-icon">
                                <GallerySvg className="select-item-svg gallery"/>
                                <div>انتخاب از گالری</div>
                            </Material>
                            <input hidden type="file" accept="image/*" onChange={onFileChange}/>
                        </label>
                        <CheckUserMedia>
                            <label>
                                <Material isDiv className="select-item have-icon">
                                    <CameraSvg className="select-item-svg camera"/>
                                    <div>باز کردن دوربین</div>
                                </Material>
                                <input hidden type="file" accept="image/*" capture="user" onChange={onFileChange}/>
                            </label>
                        </CheckUserMedia>
                        {
                            showLoginUser && user.avatar &&
                            <Material className="select-item have-icon remove" backgroundColor={createMaterialColor({variable: "--toast-fail-text"})} onClick={removeAvatar}>
                                <TrashSvg className="select-item-svg"/>
                                <div>حذف تصویر</div>
                            </Material>
                        }
                    </div>
                </VerticalPanel>
            }
        </>
    )
}

export default EditAvatar