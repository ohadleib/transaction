import React, { useState } from "react";
import { Container, Stack, TextField } from "@mui/material";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const [latitude, setLatitude] = useState<number>(31.0461);
  const [longitude, setLongitude] = useState<number>(34.8516);
  const [zoom, setZoom] = useState();

  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1Ijoib2hhZGxlaWIiLCJhIjoiY2wxbmxpZHloMDA3MTNpbjE2YnA0djJxbSJ9.KdMRiDzL6JJPF4fzSKb-SA",
    logoPosition: "top-right",
    pitchWithRotate: false,
  });

  return (
    <Container maxWidth="lg">
      <div style={{ margin: "20px 0" }}>
        <form>
          <Stack spacing={2} direction="row">
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="Search by address"
              value={latitude}
              type="number"
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
            />
            <TextField
              id="demo-helper-text-misaligned-no-helper"
              label="Filter by rooms"
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
            />
          </Stack>
        </form>
      </div>
      <Map
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "500px",
          width: "100%",
        }}
        zoom={[15]}
      >
        <Layer
          type="symbol"
          layout={{ "icon-image": "marker-15", "icon-allow-overlap": true }}
        >
          <Feature coordinates={[longitude, latitude]} />
        </Layer>
      </Map>
    </Container>
  );
}

export default Map;
