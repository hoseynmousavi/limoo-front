import GetReviewCarts from "../../hooks/GetReviewCarts"
import {useState} from "react"
import ReviewCartItem from "../containers/review/ReviewCartItem"
import MyLoader from "../../seyed-modules/components/MyLoader"
import textConstant from "../../constant/textConstant"
import Button from "../../seyed-modules/components/Button"
import goBack from "../../seyed-modules/helpers/goBack"

function ReviewCartsPage()
{
    const {isLoading} = GetReviewCarts({doAfterGet})
    const [data, setData] = useState([])
    const [index, setIndex] = useState(0)
    const cart = data[index] ?? {}

    function doAfterGet({list})
    {
        setData(list)
    }

    function nextCart()
    {
        if (data.length > index + 1) setIndex(index => index + 1)
        else setIndex(-1)
    }

    return (
        <div className="review">
            {
                isLoading ?
                    <MyLoader/>
                    :
                    index === -1 || data.length === 0 ?
                        <div className="review-done">
                            {textConstant.reviewDone}
                            <Button type="first" className="review-done-back" onClick={goBack}>{textConstant.back}</Button>
                        </div>
                        :
                        <ReviewCartItem key={index} cart={cart} next={nextCart}/>
            }
        </div>
    )
}

export default ReviewCartsPage