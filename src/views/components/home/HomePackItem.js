import SlideEffect from "../SlideEffect"
import Material from "../Material"
import textConstant from "../../../constant/textConstant"
import PackActions from "../../../context/pack/PackActions"
import {useContext} from "react"
import {PackContext} from "../../../context/pack/PackReducer"
import toastManager from "../../../helpers/toastManager"
import {INFO_TOAST} from "../../../constant/toastTypes"

function HomePackItem({data: {_id, name, carts_count}})
{
    const {dispatch} = useContext(PackContext)

    function remove()
    {
        PackActions.deletePack({dispatch, packId: _id})
            .then(message =>
            {
                toastManager.addToast({message, type: INFO_TOAST})
            })
    }

    return (
        <SlideEffect className="home-pack-item" onRemove={remove}>
            <Material className="home-pack-item-content">
                <div className="home-pack-item-title">{name}</div>
                <div className="home-pack-item-count">
                    {
                        carts_count > 0 ?
                            textConstant.haveCart(carts_count)
                            :
                            textConstant.noCart
                    }
                </div>
            </Material>
        </SlideEffect>
    )
}

export default HomePackItem