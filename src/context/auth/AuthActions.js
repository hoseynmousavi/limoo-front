import {SET_USER} from "./AuthTypes"
import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import cartActions from "../cart/CartActions"

const base = process.env.REACT_APP_REST_URL

const sendOtp = ({mobile, cancel}) =>
{
    return request.post({base, url: apiUrlsConstant.getOtp, data: {phone: mobile}, cancel})
}

const loginOrSignup = ({mobile, code, dispatch}) =>
{
    return request.post({base, url: apiUrlsConstant.verifyOtp, data: {phone: mobile, code}})
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
    return request.sendFile({base, url: apiUrlsConstant.updateAvatar, data, progress})
        .then(({data: user}) =>
        {
            setUser({data: {user}, dispatch})
            return user.avatar
        })
}

const getUser = ({dispatch}) =>
{
    request.get({base, url: apiUrlsConstant.getProfile, dontCache: true, dontToast: true})
        .then(({data: user}) =>
        {
            setUser({data: {user}, dispatch})
        })
}

const editProfile = ({data, dispatch, cartDispatch}) =>
{
    return request.patch({base, url: apiUrlsConstant.updateProfile, data})
        .then(({data: user}) =>
        {
            setUser({data: {user}, dispatch})
            if (data.daily_goal) cartActions.getReviewCarts({dispatch: cartDispatch})
        })
}

const getTokenWithRefreshToken = () =>
{
    return request.get({base, url: apiUrlsConstant.refreshToken, dontCache: true, dontToast: true, useRefreshToken: true})
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
    return request.post({base, url: apiUrlsConstant.checkEmail, data: {email}, cancel})
}

const setUser = ({data, dispatch}) =>
{
    dispatch({
        type: SET_USER,
        payload: {data},
    })
}

const AuthActions = {
    sendOtp,
    loginOrSignup,
    getUser,
    checkEmail,
    setUser,
    getTokenWithRefreshToken,
    editProfile,
    editAvatar,
}

export default AuthActions