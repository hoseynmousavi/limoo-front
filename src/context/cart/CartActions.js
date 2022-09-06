import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_REVIEW_CARTS, REVIEW_CART} from "./CartTypes"

const base = process.env.REACT_APP_REST_URL

function getReviewCarts({dispatch, cancel})
{
    request.get({base, url: apiUrlsConstant.cartReview, cancel})
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
    request.post({base, url: apiUrlsConstant.cartReview, data})
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