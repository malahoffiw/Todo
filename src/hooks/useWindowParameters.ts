import { useState, useEffect } from "react"

const useWindowParameters = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    useEffect(() => {
        function watchWindow() {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener("resize", watchWindow)

        return () => {
            window.removeEventListener("resize", watchWindow)
        }
    }, [])

    return { windowWidth, windowHeight }
}

export default useWindowParameters
