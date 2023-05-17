"use client"

import { useContext, useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css"
import {icon} from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import axios from 'axios'
import SearchContext from '@/app/context/SearchContext'
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

const MapComponent = ({ ip }) => {
    const map = useMap();
  
    useEffect(() => {
      if (ip) {
        map.setView([ip.location.lat, ip.location.lng], 13);
      }
    }, [ip]);
  
    return null;
  };

const Map = () => {

    const [ip, setIp] = useState()
    const { searchInfo, setSearchInfo } = useContext(SearchContext)
    const [map,setMap] = useState(null)

    console.log(ip)

    const ICON = icon({
        iconUrl: '/public/broche.png',
        iconSize: [46, 56],
        iconAnchor: [23, 56],
        popupAnchor: [0, -56],
    })

    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}&ipAddress=`)
            .then(res => {
                console.log(res.data)
                const data = res.data;
                setIp(data);
                setSearchInfo(data);
            })
    }, [])

    useEffect(() => {
        if (searchInfo) {
            setIp(searchInfo)
        }
    }, [searchInfo])


    if(!ip) {
        return <div>Loading...</div>
    }
    
    return (
        <MapContainer center={[ip.location.lat,ip.location.lng  ]} zoom={13}  scrollWheelZoom={false}>
            <MapComponent ip={ip} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ip && (
                <Marker position={[ip.location.lat, ip.location.lng]} >
                    
                </Marker>
            )}
        </MapContainer>
    )
}

export default Map