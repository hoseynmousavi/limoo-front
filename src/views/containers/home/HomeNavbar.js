import {useContext} from "react"
import Button from "../../components/Button"
import Material from "../../components/Material"
import Link from "../../components/Link"
import textConstant from "../../../constant/textConstant"
import getUserFixName from "../../../helpers/getUserFixName"
import urlConstant from "../../../constant/urlConstant"
import UserAvatar from "../../components/UserAvatar"
import {AuthContext} from "../../../context/auth/AuthReducer"

function HomeNavbar()
{
    const {state: user} = useContext(AuthContext)
    return (
        <div className="home-navbar">
            <Link to={urlConstant.showProfile} className="home-navbar-profile-link">
                <Material className="home-navbar-profile">
                    <UserAvatar className="home-navbar-profile-img" showLoginUser zoomable={false}/>
                    <div className="home-navbar-profile-name">
                        {getUserFixName({user, short: true})}
                    </div>
                </Material>
            </Link>
            <Button className="home-navbar-btn" type="first">
                {textConstant.reviewCarts}
            </Button>
        </div>
    )
}

export default HomeNavbar