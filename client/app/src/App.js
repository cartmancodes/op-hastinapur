import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Garbage from "./scenes/garbage";
import Graffiti from "./scenes/graffiti";
import Potholes from "./scenes/potholes";
import Sidewalk from "./scenes/sidewalk";
import Construction from "./scenes/construction";
import Sand from "./scenes/sand";
import Billboard from "./scenes/billboard";
import Facade from "./scenes/facade";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/garbage" element={<Garbage />} />
              <Route path="/potholes" element={<Potholes />} />
              <Route path="/graffiti" element={<Graffiti />} />
              <Route path="/sidewalk" element={<Sidewalk />} />
              <Route path="/construction" element={<Construction />} />
              <Route path="/sand" element={<Sand />} />
              <Route path="/billboard" element={<Billboard />} />
              <Route path="/facade" element={<Facade />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;