import styles from "../../styles/Profile.module.css"
import { useSession, signIn, signOut } from "next-auth/react"
import LoginPage from "@/components/LoginPage"

export default function Profile(){
    const { data: session } = useSession()

    console.log(session)
    if(!session) return (<LoginPage />)
    return(
        <main className={styles.profile_page}>
            <button onClick={() => signOut()}>Sign Out</button>

        </main>
    )
}