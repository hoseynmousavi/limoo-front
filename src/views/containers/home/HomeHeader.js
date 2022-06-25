import {dontSwitchGesture} from "../../../hooks/SwitchGesture"
import HomeHeaderAddPack from "../../components/home/HomeHeaderAddPack"

function HomeHeader()
{
    return (
        <div className={`home-add ${dontSwitchGesture}`}>
            <div className="home-add-items hide-scroll">
                <div className="home-add-items-child">
                    <HomeHeaderAddPack/>
                </div>
            </div>
            <div className="home-add-logo">{process.env.REACT_APP_NAME}</div>
        </div>
    )
}

export default HomeHeader