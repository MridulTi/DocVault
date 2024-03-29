import React, { useState } from 'react'

function ChatModal({funtionName, readMessage, FriendMsg, account ,userName,loading ,currentUserName,currentUserAddress}) {
    const [message,setMessage]=useState('');
    const [chatData,setChatData]=useState({
        name:"",
        address:""
    });
    return (
        <div>
            {console.log(FriendMsg)}
            {FriendMsg.map((el,i)=>(
                <div>
                    {el.sender}
                </div>
            ))}
        </div>
  )
}

export default ChatModal