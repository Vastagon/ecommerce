import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"

import Image from 'next/image'
import MoneyBagImage from "../../public/images/money-bag.png"
import profileIcon from "../../public/images/icons8-male-user-90.png"
import Loading from './Loading'



export default function Navbar(){
  const router = useRouter()
  const { data: session } = useSession()
  let profileImage = ""

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


  if(profileImage.length === 0) return <Loading />

  return(
    <div className={styles.navbar}>
      <div onClick={goToHome}>
        <Image className={styles.nav_icon} alt="Icon" src={MoneyBagImage} />
      </div>

      <div className={styles.nav_tabs_container}>
        <p className={styles.nav_tab}><Link href="/Store" className={styles.nav_tab}>Store</Link></p>
        <Image onClick={goToAccount} height={10} width={8} loader={() => profileImage} className={styles.profile_icon} src={profileImage} alt="ads" />
      </div>
    </div>
  )
}