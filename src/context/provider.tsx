import { createContext, useState } from "react";

export const MyContext = createContext({})

export const Provider = ({children}: any) => {
    const [ stopLoop, setStopLoop ] = useState<boolean>(false)
    const [ line, setLine ] = useState<boolean>(false)
    
    return(
        <MyContext.Provider value={{
            stopLoop, setStopLoop, 
            line, setLine,
        }}>
            {children}
        </MyContext.Provider>
    )
}