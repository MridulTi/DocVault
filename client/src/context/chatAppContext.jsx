import React,{useState,useEffect} from "react";

import { CheckIfWalletConneted,connectWallet,connectingwithContract } from "../lib/utils/apiFeature";

export const ChatAppContext=React.createContext();
export const ChatAppProvider=({children})=>{
    const title="Hey Welcome to blockchain ChatApp";
    return(
        <ChatAppContext.Provider value={{title}}>
            {children}
        </ChatAppContext.Provider>
    )
}