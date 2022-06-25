import {createContext, useEffect, useReducer} from "react"
import logoutManager from "../../helpers/logoutManager"
import {LOGOUT} from "../auth/AuthTypes"
import {ADD_PACK, GET_PACK, REMOVE_PACK} from "./PackTypes"

export const PackContext = createContext(null)

const initialState = {
    keys: [],
    packs: {},
    getDone: false,
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case GET_PACK:
        {
            const {data} = action.payload
            return {
                ...state,
                keys: [...new Set([...state.keys, ...data.map(item => item._id)])],
                packs: {
                    ...state.packs,
                    ...data.reduce((sum, item) => ({...sum, [item._id]: item}), {}),
                },
                getDone: true,
            }
        }
        case ADD_PACK:
        {
            const {data} = action.payload
            const {_id} = data
            return {
                ...state,
                keys: [...new Set([...state.keys, _id])],
                packs: {
                    ...state.packs,
                    [_id]: data,
                },
            }
        }
        case REMOVE_PACK:
        {
            const {packId} = action.payload
            const keys = [...state.keys]
            keys.splice(keys.indexOf(packId), 1)
            return {
                ...state,
                keys,
            }
        }
        case LOGOUT:
        {
            return init()
        }
        default:
        {
            throw new Error()
        }
    }
}

function PackProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() => logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})}), [])

    return (
        <PackContext.Provider value={{state, dispatch}}>
            {children}
        </PackContext.Provider>
    )
}

export default PackProvider