import Image from "next/image"
import styles from "../styles/Store.module.css"
import { useRouter } from 'next/router'

type ShoppingPageProps = {
  title: string
  image: string
}



export default function ShoppingPageCard(props: ShoppingPageProps){
  const router = useRouter()

  function goToItemPage(name: string){
    router.push(`/${name}`)
  }


  return (
    <div onClick={() => goToItemPage(props.title)} className={styles.store_page_card}>
      <Image className={styles.card_image} loader={() => props.image} width={100} height={200} alt="Item Image" src={props.image} />
      <p>{props.title}</p>
    </div>
  )
}