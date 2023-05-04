import { useRouter } from "next/router";
import styles from "../../styles/itemPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import { UserContext } from "../../components/UserContext";
import { useContext } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import { prodOrDev } from "../../components/helperFunctions/ProdOrDev";
import Navbar from "@/components/Navbar";


type itemInfo = {
  category: string
  count: number
  item_description: string
  price: number
  rating: number
  title: string
  image_path: string
}

type itemProps = {
  item: any
}

export async function getStaticPaths() {
  const serverURI = prodOrDev() || "";

  const req = await axios.post(`${serverURI}/api/getAllStoreCards`);
  // const allItems = req.data.allItems;
  const allItems = req.data.allItems;

  const paths = allItems.map((item: any) => ({
    params: { itemPage: item.title },
  }));



  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const { params } = context;

  const serverURI = prodOrDev() || "";

  const res = await axios.post(`${serverURI}/api/getIndividualItem`, { id: params.itemPage });
  const item = res.data.itemInfo;





  return {
    props: { item: item }
  };
}

export default function itemPage(props: itemProps) {
  // console.log(props);
  // const { addToCart } = useContext(UserContext);

  // const handleChange = (event: SelectChangeEvent) => {
  //   addToCart(props.item.title, event.target.value);
  //   // setQuantity(event.target.value);
  // };

  ///I can use category for a tag search system
  return (
    <main>
      <Box justifyContent="center" alignItems="center" minHeight="70vh" display="flex">
        <Image width={100} height={10} src={props.item.image_path} className={styles.item_image} alt="ads" />

        <Box paddingLeft={5} paddingRight={5} paddingTop={2} sx={{ backgroundColor: "blue", width: "40%", height: "30vw" }}>
          <Typography borderBottom={2} borderColor="red" variant="h3">{props.item.title}</Typography>

          <Rating sx={{ marginTop: 1 }} size="small" name="read-only" value={props.item.rating} readOnly />
          <Typography>${props.item.price}</Typography>
          <Typography>{props.item.item_description}</Typography>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // onChange={handleChange}
              label="Quantity"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </main>
  );
}