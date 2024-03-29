import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <>
            <Head>
                <title>Ecommerce</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <script src="https://kit.fontawesome.com/545ec7fe20.js" crossOrigin="anonymous"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

            </Head>

            <main>
                <h1>Main Page</h1>
            </main>
        </>
    );
}
