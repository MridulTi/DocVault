import { useContext, useEffect } from "react"
import { ChatAppContext } from "../context/chatAppContext";
import { AccCard } from "../lists/Data";
import { ChatCard, UserCard } from "./Cards";

const Friend=()=>{


    const {
        sendMessage,
        account,
        FriendLists,
        readMessage,
        userName,
        getMyFriend,
        loading,
        FriendMsg,
        currentUserAddress,
        currentUserName,
        readUser,
    }=useContext(ChatAppContext);
    return (
        <div className="">
            <div className="">
                <div className="">
                    {/* {console.log(FriendLists)} */}
                    {FriendLists.map((el)=>{
                        return(
                            <ChatCard el={el}/>

                        )
                    })}
                </div>
                <div className="">
                    {/* <Chat funtionName={sendMessage} readMessage={readMessage} FriendMsg={FriendMsg} account={account} userName={userName} loading={loading} currentUserName={currentUserName} currentUserAddress={currentUserAddress}/> */}
                </div>
            </div>
        </div>
    )
}
export  default Friend;