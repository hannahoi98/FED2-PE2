import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleVenue from "./pages/SingleVenue";
import BottomNav from "./components/BottomNav";
import Profile from "./pages/Profile";
import CreateVenuePage from "./pages/CreateVenue";

function App() {
  return (
    <>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Container
          component="main"
          sx={{ py: 5, flexGrow: 1, pb: { xs: 10, md: 6 } }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venues/:id" element={<SingleVenue />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/venues/new" element={<CreateVenuePage />} />
          </Routes>
        </Container>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Footer />
        </Box>
        <BottomNav />
      </Box>
    </>
  );
}

export default App;
