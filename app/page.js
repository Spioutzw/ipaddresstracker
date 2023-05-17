'use client'

import Image from 'next/image'
import styles from './page.module.css'
import SearchBar from './components/SearchBar/SearchBar'
import Map from './components/Map/Map'
import SearchContext from './context/SearchContext'
import { useEffect, useRef, useState } from 'react'
import Result from './components/Result/Result'

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
          <Map />
        </div>
      </main>
    </SearchContext.Provider>
  )
}
