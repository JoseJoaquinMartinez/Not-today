import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singup from "./pages/Singup.tsx";
import Login from "./pages/Login.tsx";
import MainPage from "./components/MainPage.tsx";
import Home from "./pages/Home.tsx";

import PrivateRoute from "./PrivateRoute.tsx";

import "../front/styles/App.css";
import Page404 from "./pages/Page404.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/not-today"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
