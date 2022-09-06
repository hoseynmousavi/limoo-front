import {useContext, useEffect, useRef} from "react"
import PackActions from "../context/pack/PackActions"
import {PackContext} from "../context/pack/PackReducer"
import {REQUEST_CANCEL} from "../seyed-modules/constant/toastTypes"

function GetPacks()
{
    const {state: {keys, packs, getDone}, dispatch} = useContext(PackContext)
    let list = keys.length > 0 ? keys.reduce((sum, item) => [...sum, packs[item]], []) : []
    const isLoading = !getDone
    const request = useRef(null)

    useEffect(() =>
    {
        if (isLoading) PackActions.getPacks({dispatch, cancel: cancelSource => request.current = cancelSource})
        return () => request?.current?.cancel?.(REQUEST_CANCEL)
        // eslint-disable-next-line
    }, [])

    return {isLoading, list}
}

export default GetPacks