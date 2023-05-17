import ShoppingPageCard from "@/components/ShoppingPageCard";
import styles from "../../styles/Store.module.css";
import { v4 as uuid } from "uuid";
import axios from "axios";
import prisma from "@/components/prisma";

import { useRouter } from "next/router";

import { Container, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { prodOrDev } from "../../components/helperFunctions/ProdOrDev";
import { useEffect, useState } from "react";

type cardProps = {
  props: any
  cards: any
  totalPages: number
  items: any
  serverURI: string
}

export async function getStaticProps() {
  const serverURI = prodOrDev() || "";
  // const req = await axios.post(`${serverURI}/api/getStoreCards`, { pageClicked: 1 });
  // const items = req.data.pageItems;
  // const totalPages = req.data.totalPages;


  const pageData = await prisma.$queryRaw`SELECT title, image_path, price, rating FROM items LIMIT 20 OFFSET 20`;

  let totalItems: any = await prisma.$queryRaw`SELECT COUNT(*) as totalitems FROM items;`;
  ///Normal query returns a bigInt, so I need to do this to get rid of the n at the end and convert it to a number I can use
  totalItems = parseInt(totalItems[0].totalitems.toString());

  const totalPages = Math.floor(totalItems / 20);


  return {
    props: { items: pageData, totalPages: totalPages, serverURI: serverURI }
  };
}

export default function Store(props: cardProps) {
  const [items, setItems] = useState(props.items);
  const router = useRouter();

  useEffect(() => {
    const fetchPage = async () => {
      const query = router.query;
      const page = query.page || 1;

      const req = await axios.post(`${props.serverURI}/api/getStoreCards`, { pageClicked: page });
      setItems(req.data.pageItems);
    };

    fetchPage();
  }, [router.isReady, router.query]);

  function changePage(pageNumber: any) {
    router.push(`/Store?page=${pageNumber.toString()}`);
  }

  const cards = (items.map((prev: { title: string; image_path: string; items_uid: string, price: number, rating: number }) => {
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


  return (
    <main>
      <Container maxWidth="xl">
        <Grid container columnSpacing={8} rowSpacing={4}>
          {cards}
        </Grid>
      </Container>

      <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Pagination onChange={(e, pageNumber) => changePage(pageNumber)} variant="outlined" color="secondary" sx={{
          marginTop: "5%",
          marginBottom: "3%",

          "& .MuiPaginationItem-root": {
            color: "primary.contrastText"
          }
        }} count={props.totalPages} />
      </Container>

    </main>
  );
}