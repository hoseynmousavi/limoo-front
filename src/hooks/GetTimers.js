import {useContext, useEffect, useRef} from "react"
import toastConstant from "../constant/toastConstant"
import TimerActions from "../context/timer/TimerActions"
import {TimerContext} from "../context/timer/TimerReducer"

function GetTimers()
{
    const {state: {list, getDone}, dispatch} = useContext(TimerContext)
    const isLoading = !getDone
    const request = useRef(null)

    useEffect(() =>
    {
        TimerActions.getTimers({dispatch, cancel: cancelSource => request.current = cancelSource})
        return () => request?.current?.cancel?.(toastConstant.requestCancel)
        // eslint-disable-next-line
    }, [])

    return {isLoading, list}
}

export default GetTimers