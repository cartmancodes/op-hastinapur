import React,{useEffect} from "react";
import Dashboard from "./Components/Dashboard";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import SustainabilityPage from "./Components/SustainabilityPage";
import TouristPage from './Components/TouristPage';
import DashBoardHome from "./Components/DashBoardHome";
import Monitering from "./Components/Monitering";
import IntiateAction from "./Components/IntiateAction";
import { Help } from "@mui/icons-material";
import OtherModule from './Components/OtherModule'
import Planning from "./Components/Planning";
import Traffic from "./Components/TrafficPageComponents/Traffic";

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
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Navigate to='/monitering'></Navigate>} />
          <Route path="monitering" element={<Monitering />} >
            <Route path="" element={<DashBoardHome />} />
            <Route path="sustainability" element={<SustainabilityPage />} />
            <Route path="tourism" element={<TouristPage />} />
            <Route path="traffic" element={<Traffic />}></Route>
          </Route>
          <Route path="intiateaction" element={<IntiateAction></IntiateAction>} />
          <Route path="/help" element={<Help />} />
          <Route path="others" element={<OtherModule />} />
          <Route path={`planning`} element={<Planning />} />
        </Route>
      </Routes>

    </React.Fragment>
  );
}

export default App;
