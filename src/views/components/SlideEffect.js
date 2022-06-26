import TrashSvg from "../../media/svg/TrashSvg"
import SlideEffectGestures from "../../hooks/SlideEffectGestures"

function SlideEffect({children, className, onRemove, cartHeight = 85})
{
    const {onTouchEnd, onTouchMove, onTouchStart, removeRef, contRef} = SlideEffectGestures({cartHeight})

    function onRemoveClick()
    {
        onRemove()
    }

    return (
        <div className={`slide-effect ${className}`} ref={contRef} onMouseDown={onTouchStart} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div className="slide-effect-item remove" onClick={onRemoveClick} ref={removeRef} style={{minWidth: `${cartHeight}px`, marginRight: `${-cartHeight}px`}}><TrashSvg className="slide-effect-item-icon"/></div>
            <div className="slide-effect-content">
                {children}
            </div>
        </div>
    )
}

export default SlideEffect