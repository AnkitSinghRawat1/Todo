import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/home" element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}
