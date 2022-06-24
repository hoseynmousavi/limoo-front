import MyLoader from "./MyLoader"
import GetTimers from "../../hooks/GetTimers"
import HomeTimerNotFound from "../containers/HomeTimerNotFound"
import HomeTimerItem from "../containers/HomeTimerItem"

function HomeTimer()
{
    const {list, isLoading} = GetTimers()
    const isEmpty = !isLoading && list.length === 0
    return (
        <>
            <div className="home-detail" style={{height: isEmpty || isLoading ? "217px" : "300px"}}>
                <MyLoader className={`home-detail-loading ${isLoading ? "" : "hide"}`}/>
                {
                    !isLoading ?
                        list?.length > 0 ?
                            <HomeTimerItem timer={list[0]}/>
                            :
                            <HomeTimerNotFound/>
                        :
                        null
                }
            </div>
        </>
    )
}

export default HomeTimer