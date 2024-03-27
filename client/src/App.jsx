
import { useState, useEffect } from "react";
import UploadContract from "../../build/contracts/Upload.json";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home/Home";
import MainLayout from "./Page/More/MainLayout";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Page/More/Login";
import Friends from "./Page/Home/Friends";
//import { Upload } from "lucide-react";
import { ethers } from "ethers";
import Upload from "./components/Upload";

// import Monitoring from "./Pages/Monitoring/Monitoring";
export default function App(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
    const router = createBrowserRouter([
        {
          path:"/",
          element:isAuthenticated?<MainLayout/>:<Login/>,
          children:[

            {
              path: "/",
              element:<Home contract={contract} account={account}/>
            },
            {
              path: "/friends",
              element:<Friends/>
            },
            {
              path:"/Upload",
              element:<Upload contract={contract} account={account} provider={provider}/>
            }
            // {
            //   path: "/monitor",
            //   children:[
            //     {
                  
            //       path:"/monitor/:Slugs",
            //       element:<Monitoring/>
            //     }
            //   ]
            // },
            // {
            //   path: "/about",
            //   element: <About/>,
            // },
            
         
          ]
        },
      ]);
      useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
    
        const loadProvider = async () => {
          if (provider) {
            window.ethereum.on("chainChanged", () => {
              window.location.reload();
            });
    
            window.ethereum.on("accountsChanged", () => {
              window.location.reload();
            });
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            let contractAddress = "0xA16d9B6618d182DBc696c2cFc05060F4ddb66583";
    
            const contract = new ethers.Contract(
              contractAddress,
              Upload.abi,
              signer
            );
            //console.log(contract);
            setContract(contract);
            setProvider(provider);
          } else {
            console.error("Metamask is not installed");
          }
        };
        provider && loadProvider();
      }, []);

      return (
        <div className="">
          <RouterProvider router={router}/>
        </div>
      )
}
// a4b8dffa023151d7265889a30bc14680dc903b85
