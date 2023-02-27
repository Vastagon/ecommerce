import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Image from 'next/image'
import MoneyBagImage from "../../public/images/money-bag.png"
import profileIcon from "../../public/images/icons8-male-user-90.png"


export default function Navbar(){
  const router = useRouter()

  function goToHome(){
    router.push("/")
  }

  function goToAccount(){
    router.push("/Profile")
  }

  return(
    <div className={styles.navbar}>
      <div onClick={goToHome}>
        <Image className={styles.nav_icon} alt="Icon" src={MoneyBagImage} />
      </div>

      <div className={styles.nav_tabs_container}>
        <p className={styles.nav_tab}><Link href="/Store" className={styles.nav_tab}>Store</Link></p>
        <Image onClick={goToAccount} className={styles.profile_icon} src={profileIcon} alt="ads" />
      </div>
    </div>
  )
}