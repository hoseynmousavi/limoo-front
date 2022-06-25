import Material from "../../components/Material"
import AddChildSvg from "../../../media/svg/AddChildSvg"
import textConstant from "../../../constant/textConstant"
import {useState} from "react"
import AddPackModal from "./AddPackModal"

function HomeNoPackFound()
{
    const [showAdd, setShowAdd] = useState(false)

    function toggleShow()
    {
        setShowAdd(showAdd => !showAdd)
    }

    return (
        <>
            <Material className="home-detail-content" onClick={toggleShow}>
                <AddChildSvg className="home-detail-profile-add"/>
                <div className="home-detail-profile-add-title">{textConstant.addPack}</div>
                <div className="home-detail-profile-add-desc">
                    {textConstant.addPackDesc}
                </div>
            </Material>
            {
                showAdd &&
                <AddPackModal close={toggleShow}/>
            }
        </>
    )
}

export default HomeNoPackFound