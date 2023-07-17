import react, { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { useCookies } from "react-cookie"


const AppContext = createContext()


const AppPro = (prop) => {
    const [user, setUser] = useState({})
    const [chk, setchk] = useState(false)
    const [Cookies, setCookies, removeCookie] = useCookies(['cheack'])

    return (
        <AppContext.Provider value={{ Cookies, setCookies, removeCookie, chk, setchk, user, setUser }}>
            {prop.children}
        </AppContext.Provider>
    )
}



export { AppContext, AppPro }