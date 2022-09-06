import {useState} from "react"
import PackActions from "../../../context/pack/PackActions"
import Input from "../../components/Input"
import {PackContext} from "../../../context/pack/PackReducer"
import {useContext} from "react"
import goBack from "../../../seyed-modules/helpers/goBack"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../../seyed-modules/constant/toastTypes"
import textConstant from "../../../constant/textConstant"
import VerticalPanel from "../../components/VerticalPanel"
import Button from "../../../seyed-modules/components/Button"

function AddPackModal({close})
{
    const {dispatch} = useContext(PackContext)
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState(null)
    const isDisable = !name?.trim()

    function onChange({value})
    {
        setName(value)
    }

    function submit()
    {
        setIsLoading(true)
        PackActions.addPack({data: {name}, dispatch})
            .then(text =>
            {
                goBack()
                setTimeout(() => toastManager.addToast({message: text, type: SUCCESS_TOAST}), 150)
            })
            .catch(() =>
            {
                setIsLoading(false)
            })
    }

    return (
        <VerticalPanel close={close}>
            <div className="select-title">{textConstant.addPack}</div>
            <Input name="name"
                   onChange={onChange}
                   required
                   label={textConstant.addPackName}
                   placeholder={textConstant.addPackNamePlaceholder}
                   noSpace
                   onSubmit={submit}
                   disableSubmit={isDisable}
            />
            <Button loading={isLoading} disable={isDisable} className="add-pack-button" onClick={submit}>
                {textConstant.submitBtn}
            </Button>
        </VerticalPanel>
    )
}

export default AddPackModal