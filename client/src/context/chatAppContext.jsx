import React,{useState,useEffect} from "react";

import { CheckIfWalletConneted,connectWallet,connectingwithContract } from "../lib/utils/apiFeature";

export const ChatAppContext=React.createContext();
export const ChatAppProvider=({children})=>{
    const title="Hey Welcome to blockchain ChatApp";
    const [account, setaccount] = useState("")
    const [UserName, setUserName] = useState("")
    const [UserList, setUserList] = useState("")
    const [Error, setError] = useState("")
    const [FriendLists, setFriendLists] = useState([])
    const [FriendMsg, setFriendMsg] = useState([])
    const [Loading, setLoading] = useState(false)

    // CHAT USER DATA
    const [currentUserName, setcurrentUserName] = useState("")
    const [currentUserAddress, setcurrentUserAddress] = useState("")
    
    const fetchData=async()=>{
        try {
            // Get Contract
            const C_contract=await connectingwithContract();
            // Get Account
            const connectAccount=await connectWallet();
            setaccount(connectAccount);
            // Get Username
            const userName=await C_contract.getUsername(connectAccount)
            setUserName(userName);
            // GET MY FRIEND LIST
            const friendLists=await C_contract.getMyFriendList();
            setFriendLists(friendLists);
            // GET all app user List
            const userList=await C_contract.getAllAppUsers();
            setUserList(userList)
        } catch (error) {
            setError("Please Install and Connect your Wallet");
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);
    // Read Message
    const readMessage=async(friendAddress)=>{
        try {
            const Contract=await connectingwithContract();
            const read=await Contract.readMessage(friendAddress)
            setFriendMsg(read);
            
        } catch (error) {
            setError("Currently you have not message")
            
        }
    }
    // Create Account
    const createAccount=async({name,accounAddress})=>{
        try {
            if(name||accounAddress) return setError("Name and accountAddress , cannot be empty")

            const Contract=await connectingwithContract();
            const getCreatedUser=await Contract.createAccount(name);
            setLoading(true)
            await getCreatedUser.wait();
            setLoading(false)
            window.location.reload()
        } catch (error) {
            setError("Error while creating your accound please reload your browser");
            
        }
    }
    // Add friend
    const addFriends=async({name,accounAddress})=>{
        try {
            if(name||accounAddress) return setError("Please provide name and account")
            const Contract=await connectingwithContract();
            const addMyFriend=await Contract.addFriend(accounAddress,name);
            setLoading(true)
            await addMyFriend.wait();
            setLoading(false)
            window.location.reload()

        } catch (error) {
            setError("Something went wrong while adding friends , try again")
        }
    }
    // SEnd message to your friend
    const sendMessage=async({msg,address})=>{
        try{
            if(msg||address) return setError ("Please type your message");
            const Contract=await connectingwithContract();
            const Sendmsg=await Contract.sendMessage(address,msg);
            setLoading(true)
            await Sendmsg.wait();
            setLoading(false);
            window.location.reload();

        }catch(error){
            setError("Please reload and try again");
        }
    }
    // Read UserInfo
    const readUser=async(userAddress)=>{
        const Contract=await connectingwithContract();
        const userName=await Contract.getUsername(userAddress);
        setcurrentUserName(userName);
        setcurrentUserAddress(userAddress);
    }
    return(
        <ChatAppContext.Provider value={{readMessage,CheckIfWalletConneted,connectWallet,createAccount,addFriends,sendMessage,readUser,account,UserName,FriendLists,FriendMsg,Loading,UserList,Error,currentUserAddress,currentUserName}}>
            {children}
        </ChatAppContext.Provider>
    )
}