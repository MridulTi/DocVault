import { useContext } from "react"

const Friend=()=>{


    const {
        sendMessage,
        account,
        friendList,
        readMessage,
        userName,
        loading,
        FriendMsg,
        currentUserAddress,
        currentUserName,
        readUser,
    }=useContext(ChatAppContect);

    return (
        <div className={Style.Friend}>
            <div className={Style.Friend_box}>
                <div className={Style.Friend_box_left}>
                    {friendList.map((el,i)=>{
                        <Card key={i+1} el={el} i={i} readMessage={readMessage} readUser={readUser}/>
                    })}
                </div>
                <div className={Style.Friend_box_right}>
                    <Chat funtionName={sendMessage} readMessage={readMessage} FriendMsg={FriendMsg} account={account} userName={userName} loading={loading} currentUserName={currentUserName} currentUserAddress={currentUserAddress}/>
                </div>
            </div>
        </div>
    )
}
export  default Friend;