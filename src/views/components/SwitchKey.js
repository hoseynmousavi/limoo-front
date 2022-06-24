function SwitchKey({isOn})
{
    return (
        <div className="switch-key">
            <div className={`switch-color ${isOn ? "" : "off"}`}/>
            <div className={`switch-toggle ${isOn ? "" : "off"}`}/>
        </div>
    )
}

export default SwitchKey