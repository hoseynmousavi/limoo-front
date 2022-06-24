import {SET_USER} from "./AuthTypes"
import request from "../../request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import sendFile from "../../request/sendFile"

const sendOtp = ({mobile, cancel}) =>
{
    return request.post({url: apiUrlsConstant.getOtp, data: {phone: mobile}, cancel})
}

const loginOrSignup = ({mobile, code, dispatch}) =>
{
    return request.post({url: apiUrlsConstant.verifyOtp, data: {phone: mobile, code}})
        .then(({data}) =>
        {
            const {is_sign_up} = data
            setUser({data, dispatch})
            return ({isSignUp: is_sign_up})
        })
}

const editAvatar = ({avatar, dispatch, progress}) =>
{
    const data = new FormData()
    if (avatar) data.append("avatar", avatar)
    return sendFile({url: apiUrlsConstant.updateAvatar, data, progress})
        .then(({data: user}) =>
        {
            setUser({data: {user}, dispatch})
            return user.avatar
        })
}

const getUser = ({dispatch}) =>
{
    request.get({url: apiUrlsConstant.getProfile, dontCache: true, dontToast: true})
        .then(({data: user}) =>
        {
            setUser({data: {user}, dispatch})
        })
}

const editProfile = ({data, dispatch}) =>
{
    return request.patch({url: apiUrlsConstant.updateProfile, data})
        .then(({data: user}) =>
        {
            setUser({data: {user}, dispatch})
        })
}

const getTokenWithRefreshToken = () =>
{
    return request.get({url: apiUrlsConstant.refreshToken, dontCache: true, dontToast: true, useRefreshToken: true})
        .then(res =>
        {
            const {refreshToken, token} = res
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
            return true
        })
        .catch(() =>
        {
            return false
        })
}

const checkEmail = ({email, cancel}) =>
{
    return request.post({url: apiUrlsConstant.checkEmail, data: {email}, cancel})
}

const setUser = ({data, dispatch}) =>
{
    dispatch({
        type: SET_USER,
        payload: {data},
    })
}

const logout = () =>
{
    return request.post({url: apiUrlsConstant.logout, useRefreshToken: true})
}

const AuthActions = {
    sendOtp,
    loginOrSignup,
    getUser,
    checkEmail,
    setUser,
    getTokenWithRefreshToken,
    logout,
    editProfile,
    editAvatar,
}

export default AuthActions