import {useContext} from "react"
import {AuthContext} from "../../context/auth/AuthReducer"
import getUserFixName from "../../helpers/getUserFixName"
import UserAvatar from "./UserAvatar"
import Link from "./Link"
import urlConstant from "../../constant/urlConstant"
import Material from "./Material"

function HomeNavbar()
{
    const {state: user} = useContext(AuthContext)
    return (
        <div className="home-navbar">
            <Link to={urlConstant.showProfile} className="home-navbar-profile-link">
                <Material className="home-navbar-profile">
                    <UserAvatar className="home-navbar-profile-img" showLoginUser zoomable={false}/>
                    <div className="home-navbar-profile-name">
                        {getUserFixName({user})}
                    </div>
                </Material>
            </Link>
        </div>
    )
}

export default HomeNavbar