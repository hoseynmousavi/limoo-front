import {useRef} from "react"
import changeBodyOverflow from "../seyed-modules/helpers/changeBodyOverflow"
import {dontSwitchGesture} from "../seyed-modules/hooks/SwitchGesture"

function SlideEffectGestures({cartHeight})
{
    let started = useRef(false)
    let changing = useRef(false)
    let posX = useRef(0)
    let posY = useRef(0)
    let translateX = useRef(0)
    let deltaX = useRef(0)
    let deltaY = useRef(0)
    let contRef = useRef(null)
    let removeRef = useRef(null)
    const maxTranslate = 0
    const minTranslate = -cartHeight

    function onTouchStart(e)
    {
        posX.current = e.touches?.[0].clientX || e.clientX
        posY.current = e.touches?.[0].clientY || e.clientY
        started.current = true

        if (!e.touches?.[0].clientX)
        {
            document.addEventListener("mousemove", onTouchMove, {passive: true})
            document.addEventListener("mouseup", onTouchEnd, {passive: true})
        }
    }

    function onTouchMove(e)
    {
        deltaX.current = posX.current - (e.touches?.[0].clientX || e.clientX)
        deltaY.current = posY.current - (e.touches?.[0].clientY || e.clientY)

        if (
            changing.current ||
            (
                started.current &&
                ((deltaX.current > 0) || (translateX.current === minTranslate)) &&
                deltaY.current < 5 && deltaY.current > -5
            )
        )
        {
            changeBodyOverflow(true)
            changing.current = true
            posX.current = e.touches?.[0].clientX || e.clientX
            translateX.current =
                (translateX.current - deltaX.current >= minTranslate) && (translateX.current - deltaX.current <= maxTranslate) ?
                    translateX.current - deltaX.current
                    :
                    translateX.current - deltaX.current > maxTranslate ?
                        maxTranslate
                        :
                        translateX.current - (deltaX.current / (Math.abs(translateX.current - deltaX.current) < Math.abs(translateX.current) ? 1 : 7))

            const width = -translateX.current
            if (width > -minTranslate)
            {
                removeRef.current.style.minWidth = `${width}px`
                removeRef.current.style.marginRight = `0px`
            }
            else
            {
                removeRef.current.style.minWidth = `${-minTranslate}px`
                removeRef.current.style.marginRight = `${minTranslate + width}px`
            }
        }
        started.current = false
    }

    function onTouchEnd()
    {
        if (changing.current)
        {
            changing.current = false

            function openSlide()
            {
                const time = Math.max(50, Math.abs(translateX.current - minTranslate)) * 2
                translateX.current = minTranslate
                const width = -translateX.current
                removeRef.current.style.transition = `min-width ease ${time}ms, margin-right ease ${time}ms`
                removeRef.current.style.minWidth = `${width}px`
                removeRef.current.style.marginRight = `0px`
                setTimeout(() =>
                {
                    contRef.current.classList.add(dontSwitchGesture)
                    removeRef.current.style.transition = "initial"
                    changeBodyOverflow(false)
                }, time + 10)
            }

            function closeSlide()
            {
                const time = Math.max(50, Math.abs(translateX.current - maxTranslate)) * 2
                translateX.current = maxTranslate
                removeRef.current.style.transition = `min-width ease ${time}ms, margin-right ease ${time}ms`
                removeRef.current.style.minWidth = `${-minTranslate}px`
                removeRef.current.style.marginRight = `${minTranslate}px`
                setTimeout(() =>
                {
                    contRef.current.classList.remove(dontSwitchGesture)
                    removeRef.current.style.transition = "initial"
                    changeBodyOverflow(false)
                }, time + 10)
            }

            if (deltaX.current >= 3) openSlide()
            else if (deltaX.current <= -3) closeSlide()
            else
            {
                if (translateX.current > minTranslate / 2) closeSlide()
                else openSlide()
            }
        }
        document.removeEventListener("mousemove", onTouchMove)
        document.removeEventListener("mouseup", onTouchEnd)
    }

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        removeRef,
        contRef,
    }
}

export default SlideEffectGestures