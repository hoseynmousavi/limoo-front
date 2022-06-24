import Material from "../components/Material"
import {useContext, useEffect, useRef, useState} from "react"
import CodeInput from "../components/CodeInput"
import regexConstant from "../../constant/regexConstant"
import TimerCode from "../components/TimerCode"
import goBack from "../../helpers/goBack"
import MyLoader from "../components/MyLoader"
import Button from "../components/Button"
import AuthActions from "../../context/auth/AuthActions"
import {AuthContext} from "../../context/auth/AuthReducer"
import urlConstant from "../../constant/urlConstant"
import errorConstant from "../../constant/errorConstant"
import toastConstant from "../../constant/toastConstant"
import textConstant from "../../constant/textConstant"
import showPhoneNumber from "../../helpers/showPhoneNumber"
import parseQueryString from "../../helpers/parseQueryString"

function LoginInputCode({route: {match: {params: {phone}}}})
{
    const {dispatch} = useContext(AuthContext)
    const [timerId, setTimerId] = useState(null)
    const [showError, setShowError] = useState(null)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [code, setCode] = useState(null)
    const errorTimer = useRef(null)
    const disable = !timerId || verifyLoading
    const request = useRef(null)

    useEffect(() =>
    {
        if (!regexConstant.PHONE_REGEX.test(phone || "")) window.history.replaceState("", "", urlConstant.home)
        else sendCode()

        return () => request?.current?.cancel?.(toastConstant.requestCancel)
        // eslint-disable-next-line
    }, [])

    function sendCode()
    {
        if (timerId !== null) setTimerId(null)
        AuthActions.sendOtp({mobile: phone, cancel: cancelSource => request.current = cancelSource})
            .then(() => setTimerId(new Date().toISOString()))
            .catch(err => setShowError(errorConstant(err)))
    }

    function onCodeChange(code, resetInput)
    {
        setCode(code)
        if (code)
        {
            setVerifyLoading(true)
            AuthActions.loginOrSignup({mobile: phone, code, dispatch})
                .then(() =>
                {
                    const {returnTo} = parseQueryString()
                    window.history.replaceState("", "", returnTo ? returnTo : urlConstant.home)
                })
                .catch(err =>
                {
                    setShowError(errorConstant(err))
                    setVerifyLoading(false)
                    resetInput()
                    clearTimeout(errorTimer.current)
                    errorTimer.current = setTimeout(() => setShowError(null), 2500)
                })
        }
    }

    return (
        <div className="login">
            <h1 className="login-title">{textConstant.enterCode}</h1>
            <div className="login-code-desc">
                {textConstant.enterVerifyCode}
                <div className="login-code-desc-phone">{showPhoneNumber(phone)}</div>
                {textConstant.enterVerifyCodeEnd}
            </div>
            <Material className={`login-code-edit ${verifyLoading ? "disable" : ""}`} disable={verifyLoading} onClick={goBack}>{textConstant.editPhone}</Material>
            <CodeInput error={!!showError} disable={disable} onChange={onCodeChange}/>
            <div className={`login-code-err ${!!showError ? "show" : ""}`}>{showError}</div>
            {
                timerId ?
                    <TimerCode key={timerId} disable={disable} onEndRetry={sendCode}/>
                    :
                    <MyLoader className="login-code-loading" width={32}/>
            }
            <div className="login-submit">
                <Button type="first" disable={!code} loading={verifyLoading}>{textConstant.continueBtn}</Button>
            </div>
        </div>
    )
}

export default LoginInputCode