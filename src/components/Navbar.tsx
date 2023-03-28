import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useState, useContext } from "react"
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import { UserContext } from './UserContext'

import Image from 'next/image'
import MoneyBagImage from "../../public/images/money-bag.png"
import ShoppingCart from "../../public/images/shoppingCart.png"
import Loading from './Loading'
import CartModal from './CartModal'

export default function Navbar(){
  const router = useRouter()
  const {cart} = useContext(UserContext)
  const { data: session } = useSession()
  const [showCartModal, setShowCartModal] = useState(false)
  let profileImage = ""

  function goToHome(){
    router.push("/")
  }

  function goToAccount(){
    router.push("/Profile")
  }

  function openCartContainer(){
    setShowCartModal(prev => !prev)
  }

  ///Gets profile image
  if(session){
    if(session.user){
      if(session.user.image){
        profileImage = session.user.image
        console.log(profileImage)
      }
    }
  }else{
    profileImage = "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
  }

  if(profileImage.length === 0 || !cart) return null

  return(
    <div className={styles.navbar}>
      <div onClick={goToHome}>
        <Image className={styles.nav_icon} alt="Icon" src={MoneyBagImage} />
      </div>

      <div className={styles.nav_tabs_container}>
        <p className={styles.nav_tab}><Link href="/Store" className={styles.nav_tab}>Store</Link></p>

        <div onClick={openCartContainer} className={styles.cart_container}>
          <div className={styles.items_in_cart}>{cart.length}</div>
          <Image className={styles.cart_icon} height={10} width={8} src={ShoppingCart} alt="ads" />
          {showCartModal ? <CartModal /> : null}
        </div>

        <Image onClick={goToAccount} height={10} width={8} loader={() => profileImage} className={styles.profile_icon} src={profileImage} alt="ads" />
      </div>
    </div>
  )
}