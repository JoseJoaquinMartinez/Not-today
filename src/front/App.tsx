import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singup from "./pages/Singup.tsx";

import "../front/styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Singup />} />
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/not-today" element={<Main />} /> */}
        {/* <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
