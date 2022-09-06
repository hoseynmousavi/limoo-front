import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {ADD_PACK, GET_PACK, REMOVE_PACK} from "./PackTypes"

const base = process.env.REACT_APP_REST_URL

function getPacks({dispatch, cancel})
{
    request.get({base, url: apiUrlsConstant.pack, cancel})
        .then(({data}) =>
        {
            dispatch({
                type: GET_PACK,
                payload: {data},
            })
        })
}

function addPack({dispatch, data})
{
    return request.post({base, url: apiUrlsConstant.pack, data})
        .then(res =>
        {
            const {data, message} = res
            dispatch({
                type: ADD_PACK,
                payload: {data},
            })
            return message
        })
}

function deletePack({dispatch, packId})
{
    return request.del({base, url: apiUrlsConstant.pack, data: {pack_id: packId}})
        .then(res =>
        {
            const {message} = res
            dispatch({
                type: REMOVE_PACK,
                payload: {packId},
            })
            return message
        })
}

const PackActions = {
    getPacks,
    addPack,
    deletePack,
}

export default PackActions