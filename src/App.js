import { Route, BrowserRouter, Routes } from "react-router-dom";
import Weather from "./pages/Weather";
import "./App.css";

import Weathers from "./pages/Weathers";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Weathers />} />
        <Route path="/weather/:city"  element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
