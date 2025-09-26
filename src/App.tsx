import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BottomNav from "./components/layout/BottomNav";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleVenue from "./pages/SingleVenue";
import Profile from "./pages/Profile";
import CreateVenuePage from "./pages/CreateVenue";
import EditVenuePage from "./pages/EditVenue";

/**
 * Root application base: header + routed pages + footer + mobile bottom navigation.
 *
 *
 */
function App() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container
        component="main"
        sx={{ flexGrow: 1, pt: 5, pb: { xs: 10, md: 6 } }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues/:id" element={<SingleVenue />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/venues/new" element={<CreateVenuePage />} />
          <Route path="/venues/:id/edit" element={<EditVenuePage />} />
        </Routes>
      </Container>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Footer />
      </Box>
      <BottomNav />
    </Box>
  );
}

export default App;
