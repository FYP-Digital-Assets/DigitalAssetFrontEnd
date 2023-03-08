import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound.jsx";
const Info = React.lazy(() => import("./Pages/Info.jsx"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Info />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};
export default ProjectRoutes;
