import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singup from "./pages/Singup.tsx";
import Login from "./pages/Login.tsx";
import MainPage from "./components/MainPage.tsx";

import "../front/styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-today" element={<MainPage />} />
        {/* <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
