import EditChildContentItem from "../../components/EditChildContentItem"
import textConstant from "../../../constant/textConstant"
import MoonSvg from "../../../media/svg/MoonSvg"
import GetTheme from "../../../hooks/GetTheme"
import {useEffect, useRef} from "react"

function SettingChangeTheme({contRef})
{
    const {isDark, changeTheme} = GetTheme()
    const isChanging = useRef(false)

    useEffect(() =>
    {
        if (isDark) contRef.current.classList = "edit-child dark"
        // eslint-disable-next-line
    }, [])

    function themeToggle()
    {
        if (!isChanging.current)
        {
            if (contRef.current.animate)
            {
                isChanging.current = true
                document.body.style.transition = "all ease 300ms"
                document.getElementsByClassName("index-temp")[0].style.transition = "all ease 300ms"
                contRef.current.style.transition = "all ease 300ms"
                contRef.current.classList = `edit-child ${isDark ? "dark" : ""} switch-anime`
                setTimeout(() =>
                {
                    switchTheme()
                    setTimeout(() =>
                    {
                        document.body.style.removeProperty("transition")
                        document.getElementsByClassName("index-temp")[0].style.removeProperty("transition")
                        contRef.current.style.removeProperty("transition")
                        contRef.current.classList = `edit-child ${isDark ? "" : "dark"}`
                        isChanging.current = false
                    }, 300)
                }, 400)
            }
            else switchTheme()
        }
    }

    function switchTheme()
    {
        changeTheme({theme: isDark ? "light" : "dark", save: true})
    }

    return (
        <EditChildContentItem title={textConstant.darkMode} desc={isDark ? textConstant.darkModeOn : textConstant.darkModeOff} Icon={MoonSvg} onClick={themeToggle} haveSwitch switchOn={isDark} isLast/>
    )
}

export default SettingChangeTheme