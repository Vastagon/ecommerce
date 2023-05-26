import { useRouter } from "next/router";
import styles from "../../styles/itemPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import { UserContext } from "../../components/UserContext";
import { useContext } from "react";
import prisma from "../../components/prisma";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import QuantityChange from "@/components/QuantityChange";




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
  // const serverURI = prodOrDev() || "";

  // const req = await axios.post(`${serverURI}/api/getAllStoreCards`);
  // const allItems = req.data.allItems;

  const allItems: any = await prisma.$queryRaw`SELECT title FROM items;`;


  const paths = allItems.map((item: any) => ({
    params: { itemPage: item.title },
  }));


  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const { params } = context;

  async function wasInServer() {
    const result: any = await prisma.$queryRaw`SELECT items_uid, title, image_path, item_description, rating, price FROM items WHERE title = ${params.itemPage}`;
    const resultDestructured = result[0];


    return resultDestructured;
    // return JSON.parse(JSON.stringify(resultDestructured));
  }

  const item = await wasInServer();


  return {
    props: { item: item }
  };
}

export default function itemPage(props: itemProps) {
  const { cart } = useContext(UserContext);
  const [quantity, setQuantity] = useState<number>(0)

  useEffect(() =>{
    if(cart){
      for(let i = 0; i < cart.length; i++){
        if(cart[i].title === props.item.title){
          setQuantity(cart[i].quantity)
        }
      }
    }
  }, [cart])

  // useEffect(() =>{
  //   async function t(){
  //     const serverURI = prodOrDev() || "";
  //     const res = await axios.post(`${serverURI}/api/getIndividualItem`, { id: "Tea - English Breakfast" });
  //     const item = res.data.itemInfo;
  //   }
  // }, []);

  ///I can use category for a tag search system
  return (
    <main>
      <Box sx={{ color: "white" }} justifyContent="center" alignItems="center" minHeight="70vh" display="flex">
        <Image width={100} height={10} src={props.item.image_path} className={styles.item_image} alt="ads" />

        <Box paddingLeft={5} paddingRight={5} paddingTop={2} sx={{ width: "40%", height: "30vw" }}>
          <Typography borderBottom={2} borderColor="red" variant="h3">{props.item.title}</Typography>

          <Rating sx={{ marginTop: 1 }} size="small" name="read-only" value={props.item.rating} readOnly />
          <Typography>${props.item.price}</Typography>
          <Typography>{props.item.item_description}</Typography>

          <QuantityChange quantity={quantity} title={props.item.title} />
        </Box>
      </Box>
    </main>
  );
}