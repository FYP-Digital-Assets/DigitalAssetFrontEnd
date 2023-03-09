import React from "react";
import {Outlet} from "react-router-dom" ;
import Navbar from "./Components/Navbar";
const AppLayout = ()=> {
    return (<>
        <Navbar/>
        <React.Suspense fallback={<>Loading...</>}>
            <Outlet/>
        </React.Suspense>
    </>
)}

export default AppLayout ;