import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { getSession, SessionProvider } from "next-auth/react";
import { UserContext } from "@/components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// type cartComponents = {
//   items_uid: string
//   title: string
//   image_path: string
// }

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [cart, setCart] = useState();
  const [sessionState, setSessionState] = useState<any>();
  const [showCartModal, setShowCartModal] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#3b4f6b",
        main: "#0b2447",
        dark: "#071931",
        contrastText: "#fff",
      },
      secondary: {
        light: "#b7dfec",
        main: "#A5D7E8",
        dark: "#7396a2",
        contrastText: "#000",
      },
    },
  });

  async function getSessionFunction() {
    setSessionState(await getSession());
  }

  async function addToCart(item: any, itemRoute: string) {
    if (cart) {
      if (sessionState) {
        ///Add to user's cart DB
        const res = await axios.post("http://localhost:3000/api/addItemsToCart", { email: sessionState!.user!.email, itemName: itemRoute });
        getCartAndCreateUser();
      } else {
        ///Add to state
        // cart.push(item.title)
      }
    }
  }

  useEffect(() => {
    getSessionFunction();

    ///Click listener to close cart modal when clicking outside
    window.addEventListener("click", (e) => {
      // console.log((e.target as HTMLTextAreaElement).id)
      if ((e.target as HTMLTextAreaElement).id !== "cartModal" && (e.target as HTMLTextAreaElement).id !== "cartIcon" && (e.target as HTMLTextAreaElement).name !== "cartDelButton") {
        setShowCartModal(false);
      }
    });
  }, []);

  useEffect(() => {
    getCartAndCreateUser();
  }, [sessionState]);

  async function getCartAndCreateUser() {
    if (sessionState) {
      const res = await axios.post("http://localhost:3000/api/getCartAndCreateUser", { email: sessionState.user.email, username: sessionState.user.name });

      if (res.data.cart_items) {
        setCart(res.data.cart_items);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <UserContext.Provider value={{ addToCart, cart, setCart, sessionState }}>
          <Navbar showCartModal={showCartModal} setShowCartModal={setShowCartModal} />
          <Component {...pageProps} />
        </UserContext.Provider>
      </SessionProvider>
    </ThemeProvider>
  );
}
