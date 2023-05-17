'use client'
import dynamic from 'next/dynamic';

import styles from './page.module.css'
import SearchBar from './components/SearchBar/SearchBar'
import SearchContext from './context/SearchContext'
import { useState } from 'react'
import Result from './components/Result/Result'

const MapWithNoSSR = dynamic(
  () => import('./components/Map/Map'),
  { ssr: false }
);

export default function Home() {

  const [searchInfo, setSearchInfo] = useState(null)

  

  return (
    <SearchContext.Provider value={{ searchInfo, setSearchInfo }}>
      <main className={styles.main}>
        <div className={styles.container} id='container'>
          <h1 className={styles.title}> IP Address Tracker </h1>
          <SearchBar />
        </div>
          <Result />
        <div id='map' className={styles.map}>
          <MapWithNoSSR />
        </div>
      </main>
    </SearchContext.Provider>
  )
}
