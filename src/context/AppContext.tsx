import {createContext, ReactNode, useState} from "react";

const AppContext = createContext<any>({})
export default AppContext

interface AppProviderProps {
    children: ReactNode
}

export const AppProvider = ({children}: AppProviderProps) => {

    const [state, setState] = useState(true)
    const [jwt,setJwt] = useState('')
    console.log(state)
    return <AppContext.Provider value={{state, setState,jwt,setJwt}}>{children}</AppContext.Provider>
}