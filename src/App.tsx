import React from "react";
import { Container, Link } from "@mui/material";
import { Box } from "@mui/system";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import RealEstate from "./pages/RealEstate";

function App() {
  return (
    <div style={{ padding: "50px 0" }}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Box
            sx={{
              typography: "body1",
              "& > :not(style) + :not(style)": {
                ml: 2,
              },
            }}
          >
            <Link href={"/real-estate"}>Real Estate</Link>
            <Link href={"/map"}>Map</Link>
          </Box>
        </Container>
        <Routes>
          <Route path="/" element={<Navigate to={"/real-estate"} />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
