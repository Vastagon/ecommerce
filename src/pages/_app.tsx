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
  const [showCartModal, setShowCartModal] = useState(false)


  async function getSessionFunction(){
    setSessionState(await getSession())
  }

  async function addToCart(item: any, itemRoute: string, cart: any){
    if(cart){
      if(sessionState){
        ///Add to user's cart DB
        const res = await axios.post("http://localhost:3000/api/addItemsToCart", {email: sessionState!.user!.email, itemName: itemRoute})
        getCart()
      }else{
        ///Add to state
        cart.push(item.title)
      }            
    }
  }

  useEffect(() =>{
    getSessionFunction()

    ///Click listener to close cart modal when clicking outside
    window.addEventListener("click", (e) =>{
      console.log((e.target as HTMLTextAreaElement).id)
      if((e.target as HTMLTextAreaElement).id === "cartModal" || (e.target as HTMLTextAreaElement).id === "cartIcon" || (e.target as HTMLTextAreaElement).name === "cartDelButton"){
        ///Close modal
      }else{
        setShowCartModal(false)
        console.log("HERE")
      }
    })
  }, [])
  
  useEffect(() =>{
    getCart()
  }, [sessionState])

  async function getCart(){
    if(sessionState){
      const res =  await axios.post("http://localhost:3000/api/getCart", {email: sessionState.user.email, username: sessionState.user.name})
      
      if(res.data.cart){
        setCart(res.data.cart)
      }      
    }
  }

  return ( 
    <SessionProvider session={session}>
      <UserContext.Provider value={{addToCart, cart, setCart, sessionState}}>
        <Navbar showCartModal={showCartModal} setShowCartModal={setShowCartModal} />
        <Component {...pageProps} />
      </UserContext.Provider>
    </SessionProvider>
  )
}
