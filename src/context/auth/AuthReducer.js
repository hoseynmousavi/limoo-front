import {createContext, useEffect, useReducer, useState} from "react"
import {LOGOUT, SET_USER} from "./AuthTypes"
import AuthActions from "./AuthActions"
import logoutManager from "../../seyed-modules/helpers/logoutManager"
import cookieHelper from "../../seyed-modules/helpers/cookieHelper"
import LoadingWrapper from "../../seyed-modules/components/LoadingWrapper"

export const AuthContext = createContext(null)

const initialState = null

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case SET_USER:
        {
            const {data} = action.payload
            const {refresh_token, token, user} = data
            saveUserToDisk({refresh_token, token, user})
            return user
        }
        case LOGOUT:
        {
            saveUserToDisk(null)
            return init()
        }
        default:
        {
            throw new Error()
        }
    }
}

function saveUserToDisk(data)
{
    if (data)
    {
        if (data.token)
        {
            cookieHelper.setItem("token", data.token)
        }
        if (data.refresh_token)
        {
            cookieHelper.setItem("refreshToken", data.refresh_token)
        }
        if (data.user)
        {
            localStorage.setItem("user", JSON.stringify(data.user))
        }
    }
    else
    {
        cookieHelper.removeItem("token")
        cookieHelper.removeItem("refreshToken")
        localStorage.clear()
    }
}

function AuthProvider({children})
{
    const [isLogging, setIsLogging] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        const token = cookieHelper.getItem("token")
        const refreshToken = cookieHelper.getItem("refreshToken")
        if (token && refreshToken)
        {
            const user = localStorage.getItem("user")
            if (user)
            {
                try
                {
                    AuthActions.setUser({data: {user: JSON.parse(user)}, dispatch})
                }
                catch (e)
                {
                    console.log("err parsing user:", e.message)
                }
            }
            else setIsLogging(true)

            AuthActions.getUser({dispatch})
                .then(() => setIsLogging(false))
                .catch(() => setIsLogging(false))
        }

        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {
                isLogging ?
                    <LoadingWrapper haveBg/>
                    :
                    children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider