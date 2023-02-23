import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import MoneyBagImage from "../../public/images/money-bag.png"
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Navbar(){
  const router = useRouter()

  function goToHome(){
    router.push("/")
  }

  return(
    <div className={styles.navbar}>
      <div onClick={goToHome}>
        <Image className={styles.nav_icon} alt="Icon" src={MoneyBagImage} />
      </div>

      <div className={styles.nav_tabs_container}>
        <p className={styles.nav_tab}><Link href="/Store" className={styles.nav_tab}>Store</Link></p>
        <p className={styles.nav_tab}><Link href="/Account" className={styles.nav_tab}>Account</Link></p>
      </div>
    </div>
  )
}