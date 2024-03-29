import { ethers } from 'ethers'
import ChatAppContract from "../../artifacts/ChatApp.json"
import Web3Modal from "web3modal"
import { ChatAppAddress } from '../../assets/constant'
export const CheckIfWalletConneted = async () => {
  try{
    if(!window.ethereum)return console.log("Install Metamask");
    
    const accounts=await window.ethereum.request({
      method:"eth_accounts",
    });
    const firsAccount=accounts[0]
    return firsAccount

  }catch(error){
    console.error("Metamask is not installed");
  }
}
export const connectWallet=async()=>{
  try{
    if(!window.ethereum)return console.log("Install Metamask");
    
    const accounts=await window.ethereum.request({
      method:"eth_requestAccounts",
    });
    const firsAccount=accounts[0]
    return firsAccount

  }catch(error){
    console.error("Metamask is not installed");
  }
}
const fetchContract=(signerorProvider)=>new ethers.Contract(
  ChatAppContract.abi,ChatAppAddress,signerorProvider
);
export const connectingwithContract=async()=>{
  try{
    const web3modal=new Web3Modal();
    const connection=await web3modal.connect();
    const Cprovider=new ethers.providers.Web3Provider(connection); 
    const signer=Cprovider.getSigner();
    const C_contract=fetchContract(signer)

    return C_contract;

  }catch(error){
    console.log(error);
  }
}