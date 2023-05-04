import styles from "@/styles/Cart.module.css";
import { UserContext } from "../components/UserContext";
import { useContext, useEffect, useState } from "react";
import { uuid } from "uuidv4";
import Image from "next/image";
import Loading from "@/components/Loading";
import QuantityChange from "@/components/QuantityChange";
import Navbar from "@/components/Navbar";

export default function Cart() {
  const { cart } = useContext(UserContext);
  const [cartItemsDisplay, setCartItemsDisplay] = useState();

  useEffect(() => {
    if (cart) {
      setCartItemsDisplay(cart.map((prev: any) => {
        return (
          <div className={styles.cart_column} key={uuid()}>
            <Image className={styles.column_image} width={10} height={10} src={prev.image_path} alt="alt" />
            <div className={styles.right_cart_column}>
              {prev.title}
              <QuantityChange />
            </div>
          </div>
        );
      }));
    }

  }, [cart]);


  if (!cart) return <Loading />;
  return (
    <main className={styles.container}>
      {cartItemsDisplay}
    </main>
  );
}