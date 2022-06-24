import Input from "../components/Input"
import Select from "../components/Select"
import {useContext, useState} from "react"
import Button from "../components/Button"
import DatePicker from "../components/DatePicker"
import ShieldSvg from "../../media/svg/ShieldSvg"
import AuthActions from "../../context/auth/AuthActions"
import {AuthContext} from "../../context/auth/AuthReducer"
import urlConstant from "../../constant/urlConstant"
import EditAvatar from "../components/EditAvatar"
import toastManager from "../../helpers/toastManager"
import toastConstant from "../../constant/toastConstant"
import {FAIL_TOAST, SUCCESS_TOAST} from "../../constant/toastTypes"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import showPhoneNumber from "../../helpers/showPhoneNumber"
import WizardBack from "../components/WizardBack"
import goBack from "../../helpers/goBack"
import textConstant from "../../constant/textConstant"
import GetTheme from "../../hooks/GetTheme"
import parseQueryString from "../../helpers/parseQueryString"

function EditInformation({route: {location: {pathname}}})
{
    const {isDark} = GetTheme()
    const {state: user, dispatch} = useContext(AuthContext)
    const [values, setValues] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const isAfterSignUp = pathname === urlConstant.editInformationAfterSignup

    const {first_name, last_name, email, birth_date, gender} = values
    let data = {}

    if ((first_name || first_name === "") && first_name !== (user.first_name || null)) data.first_name = first_name || null
    if ((last_name || last_name === "") && last_name !== (user.last_name || null)) data.last_name = last_name || null
    if ((email || email === "") && email !== (user.email || null)) data.email = email || null
    if ((birth_date || birth_date === "") && birth_date !== (user.birth_date || null)) data.birth_date = birth_date || null
    if ((gender || gender === "") && gender !== (user.gender || null)) data.gender = gender || null

    const validationError = Object.values(values).some(item => item === null)

    function changeField({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function goToHome()
    {
        const {returnTo} = parseQueryString()
        window.history.replaceState("", "", returnTo ? returnTo : urlConstant.home)
    }

    function saveInformation()
    {
        if (!validationError)
        {
            if (Object.values(data).length > 0)
            {
                setIsLoading(true)
                AuthActions.editProfile({data, dispatch})
                    .then(() =>
                    {
                        if (isAfterSignUp) goToHome()
                        else
                        {
                            setIsLoading(false)
                            goBack()
                            setTimeout(() => toastManager.addToast({message: toastConstant.editProfileSuccess, type: SUCCESS_TOAST}), 150)
                        }
                    })
                    .catch(() => setIsLoading(false))
            }
            else
            {
                goBack()
                setTimeout(() => toastManager.addToast({message: toastConstant.editProfileSuccess, type: SUCCESS_TOAST}), 150)
            }
        }
        else onDisableSaveClick()
    }

    function onDisableSaveClick()
    {
        if (validationError) toastManager.addToast({message: toastConstant.validationError, type: FAIL_TOAST})
    }

    return (
        <div className={`login edit ${isDark ? "dark" : ""}`}>
            <WizardBack title={isAfterSignUp ? textConstant.completeProfile : textConstant.accountInfo}
                        desc={isAfterSignUp && textConstant.completeProfileAfterSignup}
            />
            <div className="login-edit-form">
                {
                    !isAfterSignUp &&
                    <EditAvatar showLoginUser
                                avatarClassName="login-image-edit-crop"
                                label={textConstant.editAvatar}
                    />
                }
                <Input name="first_name"
                       label={textConstant.firstName}
                       placeholder={textConstant.firstName}
                       defaultValue={user.first_name || ""}
                       onChange={changeField}
                       focusOnMountDesktop
                       disableSubmit={validationError}
                       onSubmit={saveInformation}
                       onSubmitDisable={onDisableSaveClick}
                       disabled={isLoading}
                />
                <Input name="last_name"
                       label={textConstant.lastName}
                       placeholder={textConstant.lastName}
                       defaultValue={user.last_name || ""}
                       onChange={changeField}
                       disableSubmit={validationError}
                       onSubmit={saveInformation}
                       onSubmitDisable={onDisableSaveClick}
                       disabled={isLoading}
                />
                {
                    !isAfterSignUp &&
                    <>
                        <Input name="email"
                               validation="email"
                               label={textConstant.email}
                               placeholder={textConstant.enterEmail}
                               defaultValue={user.email || ""}
                               onChange={changeField}
                               ltr
                               disableSubmit={validationError}
                               onSubmit={saveInformation}
                               onSubmitDisable={onDisableSaveClick}
                               disabled={isLoading}
                        />
                        <Input name="phone"
                               label={textConstant.phone}
                               disabled
                               defaultValue={showPhoneNumber(user.phone)}
                               onChange={changeField}
                               ltr
                               Icon={ShieldSvg}
                               disableSubmit={validationError}
                               onSubmit={saveInformation}
                               onSubmitDisable={onDisableSaveClick}
                        />
                    </>
                }
                <Select name="gender"
                        full_title={textConstant.chooseGender}
                        title={textConstant.gender}
                        items={[{id: "male", name: "مرد"}, {id: "female", name: "زن"}]}
                        defaultValue={user.gender}
                        onChange={changeField}
                        disabled={isLoading}
                />
                {
                    !isAfterSignUp &&
                    <DatePicker name="birth_date"
                                full_title={textConstant.chooseBirthDate}
                                title={textConstant.birthDate}
                                defaultValue={user.birth_date}
                                onChange={changeField}
                                disabled={isLoading}
                    />
                }
            </div>
            <BtnBottomFullScreen className="login-edit-buttons">
                {isAfterSignUp && <Button className="login-edit-button skip" type="skip" disable={isLoading} onClick={goToHome}>{textConstant.skipBtn}</Button>}
                <Button className="login-edit-button" type="first" disable={validationError} loading={isLoading} onClick={saveInformation} onDisableClick={onDisableSaveClick}>{isAfterSignUp ? textConstant.continueBtn : textConstant.saveBtn}</Button>
            </BtnBottomFullScreen>
        </div>
    )
}

export default EditInformation