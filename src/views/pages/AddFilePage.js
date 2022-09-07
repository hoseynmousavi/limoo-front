import Material from "../../seyed-modules/components/Material"
import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import toastManager from "../../seyed-modules/helpers/toastManager"
import {FAIL_TOAST, SUCCESS_TOAST} from "../../seyed-modules/constant/toastTypes"
import {useState} from "react"

function AddFilePage({route: {match: {params: {_id}}}})
{
    const [loading, setLoading] = useState(false)

    function onFileChange(e)
    {
        if (!loading)
        {
            setLoading(true)
            const file = e.target.files[0]
            e.target.value = ""
            const data = new FormData()
            data.append("pack_id", _id)
            data.append("file", file)
            request.sendFile({
                base: process.env.REACT_APP_REST_URL,
                url: apiUrlsConstant.cart,
                method: "post",
                data,
            })
                .then(() =>
                {
                    toastManager.addToast({type: SUCCESS_TOAST, message: "افزوده شد"})
                    setLoading(false)
                })
                .catch(() =>
                {
                    toastManager.addToast({type: FAIL_TOAST, message: "مشکلی رخ داد"})
                    setLoading(false)
                })
        }
    }

    return (
        <div className="add-file">
            <label>
                <Material disable={loading} isDiv className="add-file-text">
                    <div>انتخاب فایل</div>
                </Material>
                <input hidden type="file" accept=".xlsx" onChange={onFileChange}/>
            </label>
        </div>
    )
}

export default AddFilePage