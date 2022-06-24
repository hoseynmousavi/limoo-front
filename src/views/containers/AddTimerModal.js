import textConstant from "../../constant/textConstant"
import Select from "../components/Select"
import Button from "../components/Button"
import VerticalPanel from "../components/VerticalPanel"
import {useContext, useState} from "react"
import TimerActions from "../../context/timer/TimerActions"
import {TimerContext} from "../../context/timer/TimerReducer"
import goBack from "../../helpers/goBack"
import toastManager from "../../helpers/toastManager"
import {SUCCESS_TOAST} from "../../constant/toastTypes"
import eggConstant from "../../constant/eggConstant"

function AddTimerModal({close})
{
    const {dispatch} = useContext(TimerContext)
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState(null)
    const isDisable = !selected

    function onChange({value})
    {
        setSelected({name: eggConstant[value].name, duration_day: value})
    }

    function submit()
    {
        setIsLoading(true)
        TimerActions.addTimer({data: selected, dispatch})
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
            <div className="select-title add-timer">{textConstant.addTimerModalTitle}</div>
            <Select full_title={textConstant.addTimerChooseEggTitle}
                    title={textConstant.addTimerChooseEgg}
                    name="egg"
                    items={Object.values(eggConstant)}
                    onChange={onChange}
            />
            <Button loading={isLoading} disable={isDisable} className="home-detail-content-submit" onClick={submit}>
                {textConstant.addTimerSubmit}
            </Button>
        </VerticalPanel>
    )
}

export default AddTimerModal