import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singup from "./pages/Singup.tsx";
import Login from "./pages/Login.tsx";

import "../front/styles/App.css";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/not-today" element={<Main />} /> */}
        {/* <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
