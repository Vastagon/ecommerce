import { createContext } from "react";

type userContextProps = {
    addToCart: any
    cart: any
    sessionState: any
    setCart: any
}

export const UserContext = createContext<userContextProps>({addToCart: [], cart: [], setCart: [], sessionState: {}});  
