import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

interface IProperty {
  address: string;
  elevator: number;
  floor: number;
  id: string;
  num_floors: number;
  num_rooms: number;
  parking: string;
  price: number;
  sqm: number;
}

function RealEstate() {
  const [transactions, setTransactions] = useState<IProperty[]>([]);
  const [filtered, setFiltered] = useState<IProperty[]>([]);
  const [rooms, setRooms] = useState<number>();
  const [address, setAddress] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/transactions.json")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(JSON.parse(data).properties);
        setFiltered(JSON.parse(data).properties);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong..");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let list: any = transactions;

    if (rooms && list) {
      list = list.filter((item: IProperty) => {
        return item.num_rooms === rooms;
      });
    }

    if (address && list) {
      list = list.filter((item: IProperty) => {
        return item.address.includes(address);
      });
    }
    if (order && list) {
      order === "asc"
        ? (list = list.sort(function (a: any, b: any) {
            return b.price - a.price;
          }))
        : order === "desc" &&
          (list = list.sort(function (a: any, b: any) {
            return a.price - b.price;
          }));
    }
    setFiltered(list);
  }, [order, address, rooms]);

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "1rem" }}>Sort by price:</span>
            <Stack spacing={2} direction="row">
              <Button
                onClick={() => {
                  setOrder("asc");
                }}
                variant="text"
              >
                Asc
              </Button>
              <Button
                onClick={() => {
                  setOrder("desc");
                }}
                variant="text"
              >
                Desc
              </Button>
            </Stack>
          </div>
          <form>
            <Stack spacing={2} direction="row">
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Search by address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                id="demo-helper-text-misaligned-no-helper"
                label="Filter by rooms"
                type="number"
                value={`${rooms}`}
                onChange={(e) => setRooms(parseInt(e.target.value))}
              />
            </Stack>
          </form>
        </div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {!!filtered?.length ? (
            filtered?.map((item: any, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Card key={item.id} sx={{ minWidth: 275 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/images/prop5.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.address || "No Address"}
                      </Typography>
                      {Object.keys(item).map((prop: any) => {
                        if (!["id", "address", "price"].includes(prop)) {
                          return (
                            <Typography
                              key={prop}
                              variant="body2"
                              color="text.secondary"
                            >
                              {prop}: {item[prop]}
                            </Typography>
                          );
                        }
                        return null;
                      })}{" "}
                      <Typography variant="h5" color="text.secondary">
                        $ {item?.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <p>No property here</p>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default RealEstate;
