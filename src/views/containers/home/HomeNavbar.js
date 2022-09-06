import {useContext} from "react"
import Button from "../../../seyed-modules/components/Button"
import Material from "../../../seyed-modules/components/Material"
import Link from "../../../seyed-modules/components/Link"
import textConstant from "../../../constant/textConstant"
import getUserFixName from "../../../helpers/getUserFixName"
import urlConstant from "../../../constant/urlConstant"
import UserAvatar from "../../components/UserAvatar"
import {AuthContext} from "../../../context/auth/AuthReducer"
import GetReviewCarts from "../../../hooks/GetReviewCarts"

function HomeNavbar()
{
    const {state: user} = useContext(AuthContext)
    const {isLoading, list} = GetReviewCarts()
    const allCartsLength = list.length
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
            <Link to={allCartsLength ? urlConstant.reviewCarts : null}>
                <Button loading={isLoading} className="home-navbar-btn" type="first">
                    {
                        allCartsLength > 0 ?
                            textConstant.reviewCarts(allCartsLength)
                            :
                            textConstant.noCartReview
                    }
                </Button>
            </Link>
        </div>
    )
}

export default HomeNavbar