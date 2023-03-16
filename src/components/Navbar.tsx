import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import axios from 'axios'

import Image from 'next/image'
import MoneyBagImage from "../../public/images/money-bag.png"
import ShoppingCart from "../../public/images/shoppingCart.png"
import Loading from './Loading'

import { UserContext } from './UserContext'
import { useContext } from "react"

export default function Navbar(){
  const {cart} = useContext(UserContext)


  const router = useRouter()
  const { data: session } = useSession()
  let profileImage = ""
  // const [cart, setCart] = useState([])

  // async function getCart(){
  //   if(session){
  //     if(session.user){
  //       if(session.user.email){
  //         console.log(session.user)
  //         const res =  await axios.post("http://localhost:3000/api/getCart", {email: session.user.email, username: session.user.name})
  //         if(res.data.cart){
  //           setCart(res.data.cart)
  //         }
  //       }
  //     }
  //   }
  // }

  // useEffect(() =>{
  //   getCart()
  // }, [session])

  function goToHome(){
    router.push("/")
  }

  function goToAccount(){
    router.push("/Profile")
  }

  ///Gets profile image
  if(session){
    if(session.user){
      if(session.user.image){
        profileImage = session.user.image
      }
    }
  }else{
    profileImage = "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
  }

  console.log(cart)
  if(profileImage.length === 0 || !cart) return <Loading />

  return(
    <div className={styles.navbar}>
      <div onClick={goToHome}>
        <Image className={styles.nav_icon} alt="Icon" src={MoneyBagImage} />
      </div>

      <div className={styles.nav_tabs_container}>
        <p className={styles.nav_tab}><Link href="/Store" className={styles.nav_tab}>Store</Link></p>

        <div className={styles.cart_container}>
          <div className={styles.items_in_cart}>{cart.length}</div>
          <Image className={styles.cart_icon} height={10} width={8} src={ShoppingCart} alt="ads" />
        </div>

        <Image onClick={goToAccount} height={10} width={8} loader={() => profileImage} className={styles.profile_icon} src={profileImage} alt="ads" />
      </div>
    </div>
  )
}