import SearchContext from '@/app/context/SearchContext'
import { useContext, useEffect, useRef } from 'react'
import style from './Result.module.css'

const Result = () => {

  const { searchInfo } = useContext(SearchContext)

  const resultRef = useRef(null);

  useEffect(() => {
    const container = document.querySelector('#container');
    const map = document.querySelector('#map');
    const result = resultRef.current;

    if (container && map && result) {
      const containerRect = container.getBoundingClientRect();
      const mapRect = map.getBoundingClientRect();
      const jointureY = (containerRect.bottom + mapRect.top) / 2;
      result.style.top = `${jointureY}px`;
      console.log('jointureY', jointureY);
    }
    console.log('result', result);
    console.log('map', map);
    console.log('container', container);

  }, []);

  return (
    <div className={style.containerResult} ref={resultRef}>
      {searchInfo && (
        <>
          <div>
            <p>ip address</p>
            <div>{searchInfo.ip}</div>
          </div>
          <hr className={style.hr}/>
          <div>
            <p>location</p>
            <div>{`${searchInfo.location.city}, ${searchInfo.location.country} ${searchInfo.location.postalCode}`}</div>
          </div>
          <hr className={style.hr}/>
          <div>
            <p>timezone</p>
            <div>{searchInfo.location.timezone}</div>
          </div>
          <hr className={style.hr}/>
          <div>
            <p>isp</p>
            <div>{searchInfo.isp}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default Result