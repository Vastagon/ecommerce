import Image from "next/image";
import styles from "../styles/Store.module.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import fullStar from "../../public/images/fullstar-cropped.png";
import halfStar from "../../public/images/halfstar-cropped.png";
import emptyStar from "../../public/images/emptystar-cropped.png";
import { uuid } from "uuidv4";
import Link from "next/link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";


type ShoppingPageProps = {
  title: string
  image_path: string
  items_uid: string
  price: number
  rating: number
}


export default function ShoppingPageCard(props: ShoppingPageProps) {
  const { addToCart, cart } = useContext(UserContext);
  const [stars, setStars] = useState<any>();
  const item = { title: props.title, image_path: props.image_path, id: props.items_uid, price: props.price, rating: props.rating };

  useEffect(() => {
    const tempArray = [];
    ///This is 3
    const fullStars = Math.floor(props.rating);
    ///This is half
    const halfStars = props.rating - fullStars;


    ///Need one more that's empty
    let halfStarCreated = false;
    for (let i = 0; i < 5; i++) {
      if (fullStars > i) {
        tempArray.push("full");
      } else if ((halfStars > .3 && halfStars < .9) && !halfStarCreated) {
        tempArray.push("half");
        halfStarCreated = true;
      } else {
        tempArray.push("empty");
      }
    }

    setStars(tempArray.map((prev) => {
      let selectedImage;
      if (prev === "full") selectedImage = fullStar;
      if (prev === "half") selectedImage = halfStar;
      if (prev === "empty") selectedImage = emptyStar;

      if (selectedImage)
        return (
          <Image key={uuid()} className={styles.stars} width={10} height={10} alt="Item Image" src={selectedImage} />
        );
    }));


  }, []);


  if (!stars) return null;
  return (
    <Link href={`/Store/${item.title}`}>
      <Card elevation={3} sx={{ maxWidth: 645 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.image_path}
            alt="green iguana"
          />

          <CardContent>
            <Typography component="div">
              {props.title}
            </Typography>

            <Typography sx={{ marginTop: 1 }} gutterBottom><b>${props.price}</b></Typography>

            <Box sx={{ display: "flex" }}>
              <Rating size="small" name="read-only" value={props.rating} readOnly />
              <Typography color="text.secondary" fontSize={12} sx={{ marginLeft: .7, marginBottom: .2, marginTop: "auto", lineHeight: 1 }}>2</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

// &#11088;

