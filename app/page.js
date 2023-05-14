import Image from 'next/image'
import styles from './page.module.css'
import SearchBar from './components/SearchBar/SearchBar'
import Map from './components/Map/Map'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}> </h1>
          <SearchBar />
        </div>
        <div id='map' className={styles.map}>
            <Map/>
          </div>
        </main>
        )
}
