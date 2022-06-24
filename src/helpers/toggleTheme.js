function toggleTheme(theme)
{
    const items = [
        "REACT_APP_FIRST_BACKGROUND_DARK_COLOR",
        "REACT_APP_SECOND_BACKGROUND_DARK_COLOR",
        "REACT_APP_FIRST_TEXT_DARK_COLOR",
        "REACT_APP_THIRD_TEXT_DARK_COLOR",
        "REACT_APP_FIRST_BORDER_DARK_COLOR",
        "REACT_APP_FIRST_DARK_SHADOW",
        "REACT_APP_SECOND_DARK_SHADOW",
        "REACT_APP_MATERIAL_DARK_COLOR",
        "REACT_APP_DISABLE_BG_DARK_COLOR",
        "REACT_APP_DISABLE_TEXT_DARK_COLOR",
    ]
    if (theme === "dark")
    {
        items.forEach(item =>
        {
            document.documentElement.style.setProperty(
                item.replace(/REACT_APP_/g, "--").replace("_DARK", "").replace(/_/g, "-").toLocaleLowerCase(),
                process.env[item],
            )
        })
    }
    else
    {
        items.forEach(item =>
        {
            document.documentElement.style.setProperty(
                item.replace(/REACT_APP_/g, "--").replace("_DARK", "").replace(/_/g, "-").toLocaleLowerCase(),
                process.env[item.replace("_DARK", "")],
            )
        })
    }
}

export default toggleTheme