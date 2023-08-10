import Material from "../../../seyed-modules/components/Material"
import {useContext, useRef, useState} from "react"
import cartActions from "../../../context/cart/CartActions"
import {CartContext} from "../../../context/cart/CartReducer"
import SpeakSvg from "../../../media/svg/SpeakSvg"

function ReviewCartItem({cart: {_id: cart_id, last_review_date, index, front, back, back_description}, next}) {
    const {dispatch} = useContext(CartContext)
    const [isDone, setIsDone] = useState(false)
    const [isFront, setIsFront] = useState(true)
    const contRef = useRef(null)
    const speechOptionRef = useRef({pitch: 1, rate: 0.5})

    function onCartClick() {
        if (isFront) {
            contRef.current.style.transform = "rotateY(90deg)"
            setTimeout(() => {
                setIsFront(false)
                if (contRef.current) contRef.current.style.transform = "rotateY(0)"
            }, 265)
        }
    }

    function onReview(know) {
        return () => {
            cartActions.review({data: {cart_id, know}, dispatch})
            setIsDone(true)
            setTimeout(next, 515)
        }
    }

    function onSpeak(e) {
        e.stopPropagation()
        const speech = new SpeechSynthesisUtterance(front)
        speech.pitch = speechOptionRef.current.pitch
        speech.rate = speechOptionRef.current.rate
        if (speechOptionRef.current.rate === 0.5) {
            speechOptionRef.current = {pitch: 2, rate: 1}
        }
        else {
            speechOptionRef.current = {pitch: 1, rate: 0.5}
        }
        speechSynthesis.speak(speech)
    }

    return (
        <div ref={contRef} className={`review-cart ${isDone ? "done" : ""}`}>
            <div className="review-cart-material" onClick={onCartClick}>

                <div className="review-cart-material-index">{index}</div>
                {index === 1 && last_review_date === undefined && <div className="review-cart-material-hint">کارت جدید</div>}

                <div className="review-cart-material-title">{isFront ? front : back}</div>
                {
                    isFront &&
                    <Material className="review-cart-material-icon" onClick={onSpeak}>
                        <SpeakSvg className="review-cart-material-icon-inner"/>
                    </Material>
                }

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
            </div>
        </div>
    )
}

export default ReviewCartItem