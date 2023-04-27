import ShoppingPageCard from "@/components/ShoppingPageCard";
import styles from "../../styles/Store.module.css";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

import { Container, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";


type cardProps = {
  map: any
  title: string
  image_path: string
  id: number
}


export default function Store() {
  const [items, setItems] = useState<cardProps>();
  const [totalPages, setTotalPages] = useState<number>();
  const [cards, setCards] = useState();

  const env = process.env.NODE_ENV
  if(env == "development"){
    // do something
    console.log("DEV")
  }
  else if (env == "production"){
    console.log("PROD")
   // do something
  }

  async function getStoreCards() {
    const req = await axios.post("http://localhost:3000/api/getStoreCards", { pageClicked: 0 });

    setTotalPages(req.data.totalPages);
    setItems(req.data.pageItems);
  }

  async function routeToPage(e: any) {
    const pageClicked = parseInt(e.target.innerText);

    const req = await axios.post("http://localhost:3000/api/getStoreCards", { pageClicked: pageClicked });
    setItems(req.data.pageItems);
  }

  useEffect(() => {
    getStoreCards();
  }, []);

  useEffect(() => {
    if (items) {
      setCards(items.map((prev: { title: string; image_path: string; items_uid: string, price: number, rating: number }) => {
        return (
          <Grid item key={uuid()} xs={12} md={4} lg={3}>
            <ShoppingPageCard
              key={uuid()}
              items_uid={prev.items_uid}
              title={prev.title}
              image_path={prev.image_path}
              price={prev.price}
              rating={prev.rating}
            />
          </Grid>
        );
      }));
    }
  }, [items]);


  if (!items || !totalPages) return <Loading />;

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container columnSpacing={8} rowSpacing={4}>
          {cards}
        </Grid>
      </Container>

      <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Pagination onClick={(e) => { routeToPage(e); }} variant="outlined" color="secondary" sx={{
          marginTop: "5%",
          marginBottom: "3%",

          "& .MuiPaginationItem-root": {
            color: "primary.contrastText"
          }
        }} count={totalPages} />
      </Container>

    </main>
  );
}