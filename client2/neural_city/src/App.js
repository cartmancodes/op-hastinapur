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
    loading ? <Loader></Loader> : <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/infra/monitering"></Navigate>}></Route>
        <Route path="/infra" element={<Dashboard />}>
          <Route path="" element={<Navigate to='/infra/monitering'></Navigate>} />
          <Route path="monitering" element={<Monitering />} >
            <Route path="" element={<DashBoardHome />} />
            <Route path="sustainability" element={<SustainabilityPage />} />
          </Route>
          <Route path="intiateaction" element={<IntiateAction></IntiateAction>} />
          <Route path="planning" element={<Planning />} />
        </Route>
        <Route path="/services" element={<Services />}>
          <Route path="" element={<Navigate to='/services/monitering'></Navigate>} />
          <Route path="monitering" element={<ServiceMoniter />}>
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
        <button onClick={handleOpen} class="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-4 md:shadow-lg">
          Request Data
        </button>
      </div>

      <FormModal open={open} heading={`Request Data`} handleClose={handleClose}>
        <RequestData></RequestData>
      </FormModal>
    </React.Fragment >
  );
}

export default App;
