
import { useState, useEffect } from "react";
<<<<<<< HEAD
import UploadContract from "../src/artifacts/Upload.json";
=======
// import UploadContract from "../../build/contracts/Upload.json";
>>>>>>> 5b9c2faf5856f7b161d7de37f76da19e691ddb23
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home/Home";
import MainLayout from "./Page/More/MainLayout";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Page/More/Login";
import Friends from "./Page/Home/Friends";
//import { Upload } from "lucide-react";
import {ethers} from 'ethers'
import Upload from "./components/Upload";

// import Monitoring from "./Pages/Monitoring/Monitoring";
export default function App(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("nfdn");
  const [provider, setProvider] = useState("fkdkf");
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    console.log("jfskj");
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
        setProvider(provider);
        let contractAddress = "0x20a4B80C84584B1B41a9Ed4389322a2E5F82970f";

        const contractt = new ethers.Contract(
          contractAddress,
          UploadContract.abi,
          signer
        );
        console.log(contract);
        setContract(contractt);
        
        console.log(provider);
        
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

    const router = createBrowserRouter([
        {
          path:"/",
          element:isAuthenticated?<MainLayout contract={contract} account={account} provider={provider}/>:<Login/>,
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
      
      console.log(provider);
      return (
        <div className="">
          <RouterProvider router={router}/>
        </div>
      )
}
// a4b8dffa023151d7265889a30bc14680dc903b85
