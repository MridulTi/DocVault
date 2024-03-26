import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Page/Home/Home";
import MainLayout from "./Page/More/MainLayout";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Page/More/Login";
import Friends from "./Page/Home/Friends";
// import Monitoring from "./Pages/Monitoring/Monitoring";
export default function App(){
  const { user, isAuthenticated, isLoading } = useAuth0();
  
    const router = createBrowserRouter([
        {
          path:"/",
          element:isAuthenticated?<MainLayout/>:<Login/>,
          children:[

            {
              path: "/",
              element:<Home/>
            },
            {
              path: "/friends",
              element:<Friends/>
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
      return (
        <div className="">
          <RouterProvider router={router}/>
        </div>
      )
}