import HomePackItem from "../../components/home/HomePackItem"
import GetPacks from "../../../hooks/GetPacks"
import MyLoader from "../../components/MyLoader"
import HomeNoPackFound from "./HomeNoPackFound"

function HomePacks()
{
    const {list, isLoading} = GetPacks()
    return (
        <>
            {
                list?.length ?
                    <div className="home-packs">
                        {
                            list.map(data =>
                                <HomePackItem key={data._id} data={data}/>,
                            )
                        }
                    </div>
                    :
                    <div className="home-packs-loading-404">
                        {
                            isLoading ?
                                <MyLoader/>
                                :
                                <HomeNoPackFound/>
                        }
                    </div>
            }
        </>
    )
}

export default HomePacks