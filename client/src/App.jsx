import { useState, useEffect } from "react";
import UploadContract from "../src/artifacts/Upload.json";
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
export default function App() {
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
        let contractAddress = "0x071A695D4F5BEeF138776B9722B58Cc7BE142B50";

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
      path: "/",
      element: isAuthenticated ? (
        <MainLayout contract={contract} account={account} provider={provider} />
      ) : (
        <Login />
      ),
      children: [
        {
          path: "/",
          element: <Home contract={contract} account={account} />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {},
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
      ],
    },
  ]);

  console.log(provider);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}
