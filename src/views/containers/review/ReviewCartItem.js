import Material from "../../components/Material"
import {useContext, useRef, useState} from "react"
import cartActions from "../../../context/cart/CartActions"
import {CartContext} from "../../../context/cart/CartReducer"

function ReviewCartItem({cart: {_id: cart_id, front, back, back_description}, next})
{
    const {dispatch} = useContext(CartContext)
    const [isDone, setIsDone] = useState(false)
    const [isFront, setIsFront] = useState(true)
    const contRef = useRef(null)

    function onCartClick()
    {
        if (isFront)
        {
            contRef.current.style.transform = "rotateY(90deg)"
            setTimeout(() =>
            {
                setIsFront(false)
                contRef.current.style.transform = "rotateY(0)"
            }, 265)
        }
    }

    function onReview(know)
    {
        return () =>
        {
            cartActions.review({data: {cart_id, know}, dispatch})
            setIsDone(true)
            setTimeout(next, 515)
        }
    }


    return (
        <div ref={contRef} className={`review-cart ${isDone ? "done" : ""}`}>
            <Material isDiv disable={!isFront} className="review-cart-material" onClick={onCartClick}>
                <div className="review-cart-material-title">{isFront ? front : back}</div>
                {
                    !isFront &&
                    <>
                        <div className="review-cart-material-desc">{back_description}</div>
                        <div className="review-cart-feedback">
                            <Material className="review-cart-feedback-item" onClick={onReview(true)}>😋</Material>
                            <Material className="review-cart-feedback-item" onClick={onReview(false)}>☹️</Material>
                        </div>
                    </>
                }
            </Material>
        </div>
    )
}

export default ReviewCartItem