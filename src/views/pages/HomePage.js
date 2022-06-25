import HomeNavbar from "../containers/home/HomeNavbar"
import HomePacks from "../containers/home/HomePacks"
import HomeHeader from "../containers/home/HomeHeader"

function HomePage()
{
    return (
        <div className="home">
            <HomeHeader/>
            <HomePacks/>
            <HomeNavbar/>
        </div>
    )
}

export default HomePage