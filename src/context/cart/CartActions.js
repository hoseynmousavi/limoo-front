import request from "../../request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_REVIEW_CARTS, REVIEW_CART} from "./CartTypes"

function getReviewCarts({dispatch, cancel})
{
    request.get({url: apiUrlsConstant.cartReview, cancel})
        .then(({data}) =>
        {
            dispatch({
                type: GET_REVIEW_CARTS,
                payload: {data},
            })
        })
}

function review({data, dispatch})
{
    request.post({url: apiUrlsConstant.cartReview, data})
        .then(() =>
        {
            dispatch({
                type: REVIEW_CART,
                payload: {data},
            })
        })
}

const CartActions = {
    getReviewCarts,
    review,
}

export default CartActions