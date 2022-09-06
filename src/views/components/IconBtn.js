import Link from "../../seyed-modules/components/Link"
import Material from "../../seyed-modules/components/Material"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"

function IconBtn({title, Icon, leftIcon, iconClassName, className, link, onClick, variable = "--link-color"})
{
    const output = (
        <Material className={`edit-child-profile-btn ${className}`} backgroundColor={createMaterialColor({variable})} onClick={onClick}>
            {Icon && !leftIcon && <Icon className={`edit-child-profile-btn-svg ${iconClassName}`}/>}
            <div>{title}</div>
            {Icon && leftIcon && <Icon className={`edit-child-profile-btn-svg ${iconClassName}`}/>}
        </Material>
    )

    if (link) return <Link to={link}>{output}</Link>
    else return output
}

export default IconBtn