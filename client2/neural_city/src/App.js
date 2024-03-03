import React, { useEffect } from "react";
import Dashboard from "./pages/infrastucture/Dashboard";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import SustainabilityPage from "./pages/infrastucture/SustainabilityPage";
import DashBoardHome from "./pages/infrastucture/DashBoardHome";
import Monitering from "./pages/infrastucture/Monitering";
import IntiateAction from "./pages/infrastucture/IntiateAction";
import Planning from "./pages/infrastucture/Planning";
import Traffic from "./pages/infrastucture/Traffic";
import Services from "./pages/services/Services";
import Navbar from "./Components/Utility/Navbar";
import Community from "./pages/community/Community";
import Footer from "./Components/Utility/Footer";
import SDGPage from "./pages/infrastucture/SDGPage";
import ServicesHome from "./pages/services/ServicesHome";

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.rawgit.com/hayeswise/Leaflet.PointInPolygon/v1.0.0/wise-leaflet-pip.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/infra/monitering"></Navigate>}></Route>
        <Route path="/infra" element={<Dashboard />}>
          <Route path="" element={<Navigate to='/infra/monitering'></Navigate>} />
          <Route path="monitering" element={<Monitering />} >
            <Route path="" element={<DashBoardHome />} />
            <Route path="sustainability" element={<SustainabilityPage />} />
            <Route path="sdg" element={<SDGPage />} />
            <Route path="traffic" element={<Traffic />}></Route>
          </Route>
          <Route path="intiateaction" element={<IntiateAction></IntiateAction>} />
          <Route path="planning" element={<Planning />} />
        </Route>
        <Route path="/services" element={<Services />}>
          <Route path="" element={<Navigate to='/services/monitering'></Navigate>} />
          <Route path="monitering" element={<ServicesHome />} />
        </Route>
        <Route path="/community" element={<Community />}>
        </Route>
      </Routes>
      <Footer />

    </React.Fragment>
  );
}

export default App;
