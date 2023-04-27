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


type itemInfo = {
  category: string
  count: number
  item_description: string
  price: number
  rating: number
  title: string
  image_path: string
}

export default function itemPage() {
  const { addToCart, serverURI } = useContext(UserContext);
  const router = useRouter();
  const [item, setItem] = useState<itemInfo>();
  const [itemRoute, setItemRoute] = useState<any>();
  const [quantity, setQuantity] = useState("");


  useEffect(() => {
    if (router.isReady) {
      setItemRoute(router.query.itemPage);
      getCardInfo(router.query.itemPage);
    }
  }, [router.isReady]);

  async function getCardInfo(itemRoute: string | string[] | undefined) {
    const res = await axios.post(`${serverURI}/api/getIndividualItem`, { id: itemRoute });
    setItem(res.data.itemInfo);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value);
  };

  ///I can use category for a tag search system
  if (!item) return <Loading />;
  return (
    <main>
      <Box justifyContent="center" alignItems="center" minHeight="70vh" display="flex">
        <Image width={100} height={10} src={item.image_path} className={styles.item_image} alt="ads" />

        <Box paddingLeft={5} paddingRight={5} paddingTop={2} sx={{ backgroundColor: "blue", width: "40%", height: "30vw" }}>
          <Typography borderBottom={2} borderColor="red" variant="h3">{item.title}</Typography>

          <Rating sx={{ marginTop: 1 }} size="small" name="read-only" value={item.rating} readOnly />
          <Typography>${item.price}</Typography>
          <Typography>{item.item_description}</Typography>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Quantity</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={quantity}
              onChange={handleChange}
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





// <Image width={100} height={100} src={item.image_path} className={styles.item_image} alt="ads" />

// <div className={styles.item_info}>
//   <h1>{item.title}</h1>
//   <div className={styles.rating_div}>
//     <p className={styles.rating_number}>⭐{item.rating}</p>
//     {/* <p>{item.count} Reviews</p> */}
//   </div>
//   <p className={styles.item_price}>${item.price}</p>
//   <p className={styles.item_description}>{item.item_description}</p>

//   <button onClick={() => { addToCart(item, item.title); }}>Add to Cart</button>

//   <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
//     <InputLabel id="demo-simple-select-standard-label">Quantity</InputLabel>
//     <Select
//       labelId="demo-simple-select-standard-label"
//       id="demo-simple-select-standard"
//       value={quantity}
//       onChange={handleChange}
//       label="Quantity"
//     >
//       <MenuItem value="">
//         <em>None</em>
//       </MenuItem>
//       <MenuItem value={1}>1</MenuItem>
//       <MenuItem value={2}>2</MenuItem>
//       <MenuItem value={3}>3</MenuItem>
//       <MenuItem value={4}>4</MenuItem>
//       <MenuItem value={5}>5</MenuItem>
//       <MenuItem value={6}>6</MenuItem>
//       <MenuItem value={7}>7</MenuItem>
//       <MenuItem value={8}>8</MenuItem>
//       <MenuItem value={9}>9</MenuItem>
//       <MenuItem value={10}>10</MenuItem>
//     </Select>
//   </FormControl>
// </div>