import styles from "@/styles/Cart.module.css";
import { UserContext } from "../components/UserContext";
import { useContext, useEffect, useState } from "react";
import { uuid } from "uuidv4";
import Image from "next/image";
import Loading from "@/components/Loading";
import QuantityChange from "@/components/QuantityChange";
import Navbar from "@/components/Navbar";
import { ButtonBase, Grid, Paper, Typography, styled } from "@mui/material";

export default function Cart() {
    const { cart } = useContext(UserContext);
    const [cartItemsDisplay, setCartItemsDisplay] = useState();


    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });


    console.log(cart)

    // useEffect(() => {
    //     if (cart) {
    //         setCartItemsDisplay(cart.map((prev: any) => {
    //             return (
    //                 <div className={styles.cart_column} key={uuid()}>
    //                     <Image className={styles.column_image} width={10} height={10} src={prev.image_path} alt="alt" />
    //                     <div className={styles.right_cart_column}>
    //                         {prev.title}
    //                         <QuantityChange />
    //                     </div>
    //                 </div>
    //             );
    //         }));
    //     }

    // }, [cart]);

    useEffect(() => {
        if (cart) {
            setCartItemsDisplay(cart.map((prev: any) => {
                console.log(prev)
                return (
                    <>
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            maxWidth: 500,
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                        >
                        <Grid container spacing={2}>
                            <Grid item>
                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                <Img alt="complex" src={prev.image_path} />
                            </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {prev.title}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Full resolution 1920x1080 • JPEG
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: 1030114
                                </Typography>
                                </Grid>
                                <Grid item>
                                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                    Remove
                                </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" component="div">
                                $19.00
                                </Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    <QuantityChange title={prev.title} quantity={prev.quantity} />
                    </>
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