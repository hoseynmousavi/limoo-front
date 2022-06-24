import {createContext, useEffect, useReducer} from "react"
import {LOGOUT, SET_USER} from "./AuthTypes"
import AuthActions from "./AuthActions"
import logoutManager from "../../helpers/logoutManager"

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
            localStorage.setItem("token", data.token)
        }
        if (data.refresh_token)
        {
            localStorage.setItem("refreshToken", data.refresh_token)
        }
        if (data.user)
        {
            localStorage.setItem("user", JSON.stringify(data.user))
        }
    }
    else
    {
        const theme = localStorage.getItem("theme")
        localStorage.clear()
        if (theme) localStorage.setItem("theme", theme)
    }
}

function AuthProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        const refreshToken = localStorage.getItem("refreshToken")
        if (user && token && refreshToken)
        {
            try
            {
                AuthActions.setUser({data: {user: JSON.parse(user)}, dispatch})
            }
            catch (e)
            {
                console.log("err parsing user:", e.message)
            }
            AuthActions.getUser({dispatch})
        }

        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider