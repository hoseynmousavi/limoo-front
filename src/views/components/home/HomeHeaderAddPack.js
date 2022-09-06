import MaskRound from "../MaskRound"
import Material from "../../../seyed-modules/components/Material"
import PlusSvg from "../../../seyed-modules/media/svg/PlusSvg"
import {useState} from "react"
import AddPackModal from "../../containers/home/AddPackModal"

function HomeHeaderAddPack()
{
    const [showAdd, setShowAdd] = useState(false)

    function toggleShow()
    {
        setShowAdd(showAdd => !showAdd)
    }

    return (
        <>
            <MaskRound className="home-add-item-cont" isChild>
                <Material className="home-add-item" onClick={toggleShow}>
                    <PlusSvg className="home-add-item-svg"/>
                </Material>
            </MaskRound>
            {
                showAdd &&
                <AddPackModal close={toggleShow}/>
            }
        </>
    )
}

export default HomeHeaderAddPack