import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import { getSession, SessionProvider } from "next-auth/react"
import { UserContext } from '@/components/UserContext'
import { useState, useEffect } from "react"
import axios from 'axios'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const [cart, setCart] = useState<string[]>()
  const [sessionState, setSessionState] = useState<any>()

  async function getSessionFunction(){
    setSessionState(await getSession())
  }

  async function addToCart(item: any, itemRoute: string, session: any, cart: any){
    if(cart){
      if(session){
          ///Add to DB
          cart.push(item.title)
          const res = await axios.post("http://localhost:3000/api/addItemsToCart", {email: session!.data!.user!.email, itemName: itemRoute})
          getCart()
      }else{
          ///Add to state
          cart.push(item.title)
      }            
    }
  }

  useEffect(() =>{
    getSessionFunction()
  }, [])
  useEffect(() =>{
    getCart()
  }, [sessionState])

  async function getCart(){
    if(sessionState){
      if(sessionState.user){
        if(sessionState.user.email){
          console.log(sessionState.user)
          const res =  await axios.post("http://localhost:3000/api/getCart", {email: sessionState.user.email, username: sessionState.user.name})
          if(res.data.cart){
            setCart(res.data.cart)
          }
        }
      }
    }
  }

  return ( 
    <SessionProvider session={session}>
      <UserContext.Provider value={{addToCart, cart}}>
        <Navbar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </SessionProvider>
  )
}
