import ShoppingPageCard from "@/components/ShoppingPageCard";
import styles from "../../styles/Store.module.css";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

import { Container, Grid } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';


type cardProps = {
  map: any
  title: string
  image_path: string
  id: number
}


export default function Store() {
  const [items, setItems] = useState<cardProps>();
  const [cards, setCards] = useState();

  async function getStoreCards() {
    const req = await axios.post("http://localhost:3000/api/getStoreCards");
    setItems(req.data.storeCards);
  }

  // function Content() {
  //   const location = useLocation();
  //   const query = new URLSearchParams(location.search);
  //   const page = parseInt(query.get('page') || '1', 10);
  //   return (
  //     <Pagination
  //       page={page}
  //       count={10}
  //       renderItem={(item) => (
  //         <PaginationItem
  //           component={Link}
  //           to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
  //           {...item}
  //         />
  //       )}
  //     />
  //   );
  // }


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


  if (!items) return <Loading />;

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container columnSpacing={8} rowSpacing={4}>
          {cards}
        </Grid>
      </Container>

      <Container sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Pagination color="primary" sx={{marginTop: "5%", marginBottom: "3%"}} count={10} />
      </Container>

    </main>
  );
}