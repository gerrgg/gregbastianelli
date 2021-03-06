/**
 * @credit https://www.joshwcomeau.com/react/boop/
 */

import { useState, useEffect, useCallback } from "react"

import { useSpring } from "react-spring"
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion.js"

const useBoop = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}) => {
  // check if user doesnt want all this motion
  const prefersReducedMotion = usePrefersReducedMotion()

  const [isBooped, setIsBooped] = useState(false)

  // set spring styles
  const style = useSpring({
    display: "inline-block",
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: springConfig,
  })

  // check is component is booped
  useEffect(() => {
    if (!isBooped) return

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false)
    }, timing)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isBooped, timing])

  const trigger = useCallback(() => {
    setIsBooped(true)
  }, [])

  let appliedStyle = prefersReducedMotion ? {} : style

  return [appliedStyle, trigger]
}

export default useBoop
