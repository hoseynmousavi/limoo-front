import {useContext, useEffect, useRef} from "react"
import CartActions from "../context/cart/CartActions"
import {CartContext} from "../context/cart/CartReducer"
import {REQUEST_CANCEL} from "../seyed-modules/constant/toastTypes"

function GetReviewCarts({doAfterGet} = {})
{
    const {state: {review: {list, getDone}}, dispatch} = useContext(CartContext)
    const isLoading = !getDone
    const request = useRef(null)

    useEffect(() =>
    {
        if (!isLoading) doAfterGet?.({list})
        // eslint-disable-next-line
    }, [isLoading])

    useEffect(() =>
    {
        if (isLoading) CartActions.getReviewCarts({dispatch, cancel: cancelSource => request.current = cancelSource})
        return () => request?.current?.cancel?.(REQUEST_CANCEL)
        // eslint-disable-next-line
    }, [])

    return {isLoading, list}
}

export default GetReviewCarts