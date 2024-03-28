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
import Modal from "./components/Modal";

// import Monitoring from "./Pages/Monitoring/Monitoring";
export default function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
        console.log(typeof address);
        setProvider(provider);
        let contractAddress = "0x16c179D4b2Dc3224aA6933403A80e9824A3d8640";

        const contractt = new ethers.Contract(
          contractAddress,
          UploadContract.abi,
          signer
        );

        setContract(contractt);
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
        <MainLayout
          contract={contract}
          account={account}
          provider={provider}
          setModalOpen={modalOpen}
        />
      ) : (
        <Login />
      ),
      children: [
        {
          path: "/",
          element: (
            <Home
              contract={contract}
              account={account}
              setModalOpen={modalOpen}
            />
          ),
        },
        {
          path: "/friends",
          children: [
            {
              path: "/friends/:Slugs",
              element: <Friends />,
            },
          ],
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

  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}
