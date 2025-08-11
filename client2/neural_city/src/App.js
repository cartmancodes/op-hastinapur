import React, { useEffect, useState } from "react";
import Dashboard from "./pages/infrastucture/Dashboard";
import { Navigate, Route } from "react-router";
import { Routes } from "react-router-dom";
import SustainabilityPage from "./pages/infrastucture/FeatureDrill";
import DashBoardHome from "./pages/infrastucture/DashBoardHome";
import Monitering from "./pages/infrastucture/Monitering";
import IntiateAction from "./pages/infrastucture/IntiateAction";
import Planning from "./pages/infrastucture/Planning";
import Traffic from "./pages/services/Traffic";
import Services from "./pages/services/Services";
import Navbar from "./Components/Global/Navbar";
import Community from "./pages/community/Community";
import Footer from "./Components/Global/Footer";
import ServicesHome from "./pages/services/ServicesHome";
import GroupsPage from "./pages/community/GroupsPage";
import ProjectPage from "./pages/community/ProjectPage";
import PollPage from "./pages/community/PollPage";
import MoniterProject from "./pages/community/MoniterProject";
import FormModal from "./Components/Modals/FormModal";
import RequestData from "./Components/Forms/RequestData";
import Loader from "./Components/Global/Loader";
import ServiceMoniter from "./pages/services/ServiceMoniter";
import { ToastContainer } from 'react-toastify';
import AreaWise from "./pages/infrastucture/AreaWise";
import ParameterWise from "./pages/infrastucture/ParameterWise";
import { BsDatabaseUp } from "react-icons/bs";

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
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  })
  const handleOpen = () => {
    console.log("Called for Open");
    setOpen(true);
  }
  const handleClose = () => {
    console.log("Called for close");
    setOpen(false);
  }
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/infra/monitoring"></Navigate>}></Route>
        <Route path="/infra" element={<Dashboard />}>
          <Route path="" element={<Navigate to='/infra/monitoring'></Navigate>} />
          <Route path="monitoring" element={<DashBoardHome />} />
          <Route path="featuredrill" element={<SustainabilityPage />} />
          <Route path="area" element={<AreaWise></AreaWise>}></Route>
          <Route path="parameter" element={<ParameterWise></ParameterWise>}></Route>
          <Route path="intiateaction" element={<IntiateAction></IntiateAction>} />
          <Route path="planning" element={<Planning />} />
        </Route>
        <Route path="/services" element={<Services />}>
          <Route path="" element={<Navigate to='/services/monitoring'></Navigate>} />
          <Route path="monitoring" element={<ServiceMoniter />}>
            <Route path="" element={<ServicesHome />} />
            <Route path="traffic" element={<Traffic />}></Route>
          </Route>
        </Route>
        <Route path="/community" element={<Community />}>
          <Route path="" element={<Navigate to='/community/group'></Navigate>} />
          <Route path="group" element={<GroupsPage></GroupsPage>} />
          <Route path="projects" element={<ProjectPage></ProjectPage>} />
          <Route path="poll" element={<PollPage></PollPage>} />
          <Route path="moniter_project" element={<MoniterProject></MoniterProject>} />
        </Route>
      </Routes>
      <Footer />
      <div class="fixed z-[1001] bottom-1 right-1 md:bottom-10 md:right-4">
        <button onClick={handleOpen} class="bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 px-4 md:shadow-lg">
          <div className="flex space-x-2 items-center">
            <BsDatabaseUp />
            <p>Request Data</p>
          </div>

        </button>
      </div>

      <FormModal open={open} heading={`Request Data`} handleClose={handleClose}>
        <RequestData handleClose={handleClose}></RequestData>
      </FormModal>
    </React.Fragment >
  );
}

export default App;
