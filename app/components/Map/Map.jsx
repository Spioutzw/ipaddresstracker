"use client"

import { useEffect, useRef, useState } from 'react'
import "leaflet/dist/leaflet.css"
import { Marker, Popup } from 'react-leaflet'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import axios from 'axios'

function Map() {

    const mapRef = useRef(null);
    const [ip, setIp] = useState()

    useEffect(() => {

        axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}&ipAddress=`)
            .then(res => {
                console.log(res.data)
                const data = res.data;
                setIp(data);
            })
            
    }, [])

    if(!ip) {
        return <div>Loading...</div>
    }
    
      


    return (
        <MapContainer center={[ip.location.lat,ip.location.lng  ]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ip && (
                <Marker position={[ip.location.lat, ip.location.lng]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    )
}

export default Map