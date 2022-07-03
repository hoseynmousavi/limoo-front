import {createContext, useEffect, useReducer} from "react"
import logoutManager from "../../helpers/logoutManager"
import {LOGOUT} from "../auth/AuthTypes"
import {GET_REVIEW_CARTS, REVIEW_CART} from "./CartTypes"

export const CartContext = createContext(null)

const initialState = {
    review: {
        list: [],
        getDone: false,
    },
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case GET_REVIEW_CARTS:
        {
            const {data: {requiredCarts, newCarts}} = action.payload
            return {
                ...state,
                review: {
                    ...state.review,
                    list: [...requiredCarts, ...newCarts],
                    getDone: true,
                },
            }
        }
        case REVIEW_CART:
        {
            const {data: {cart_id}} = action.payload
            const list = [...state.review.list]
            list.splice(list.findIndex(item => item._id === cart_id), 1)
            return {
                ...state,
                review: {
                    ...state.review,
                    list,
                },
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

function CartProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() => logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})}), [])

    return (
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider