import { createContext, useState } from "react";

export const myContext = createContext()

const CContextProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(false)

    const allContextValues = {
        isAuth,
        setIsAuth
    }
    return (


        <myContext.Provider value={allContextValues}>
            {children}
        </myContext.Provider>
    )
}

export default CContextProvider