import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { getSession, SessionProvider } from "next-auth/react";
import { UserContext } from "@/components/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const [cart, setCart] = useState();
    const [sessionState, setSessionState] = useState<any>();
    const [showCartModal, setShowCartModal] = useState(false);

    const serverURI = prodOrDev() || "";


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

    async function addToCart(itemRoute: string, quantity: number) {
        if (cart) {
            if (sessionState) {
                ///Add to user's cart DB
                const res = await axios.post(`${serverURI}/api/addItemsToCart`, { email: sessionState!.user!.email, itemName: itemRoute, quantity: quantity });
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
            const res = await axios.post(`${serverURI}/api/getCartAndCreateUser`, { email: sessionState.user.email, username: sessionState.user.name });

            if (res.data.cart_items) {
                setCart(res.data.cart_items);
            }
        }
    }

    function prodOrDev() {
        const env = process.env.NODE_ENV;
        if (env == "development") {
            return "http://localhost:3000";
        }
        else if (env == "production") {
            return "https://ecommerce-rho-wine.vercel.app/";
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <SessionProvider session={session}>
                <UserContext.Provider value={{ addToCart, cart, setCart, sessionState, serverURI }}>
                    <Navbar /> 
                    <Component {...pageProps} />
                </UserContext.Provider>
            </SessionProvider>
        </ThemeProvider>
    );
}
