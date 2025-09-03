import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleVenue from "./pages/SingleVenue";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/venues/:id" element={<SingleVenue />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
