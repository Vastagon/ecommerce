import Image from "next/image"
import styles from "../styles/Store.module.css"

type ShoppingPageProps = {
  name: string
  imagePath: string
}

export default function ShoppingPageCard(props: ShoppingPageProps){
    return (
      <div className={styles.store_page_card}>
        <Image loader={() => props.imagePath} width={100} height={100} alt="Item Image" src={props.imagePath} />
        <p>{props.name}</p>
      </div>
    )
}