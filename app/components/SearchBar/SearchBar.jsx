"use client"

import { useContext, useState } from 'react'
import style from './SearchBar.module.css'
import TextField from '@mui/material/TextField';
import axios from 'axios'
import SearchContext from '@/app/context/SearchContext';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SearchBar = () => {

  const { setSearchInfo } = useContext(SearchContext)
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    const ipv4Regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]){1,4}$/;
    if (search && (ipv4Regex.test(search) || ipv6Regex.test(search))) {
        axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}&ipAddress=${search}`)
            .then(res => {
                const data = res.data;
                setSearchInfo(data);
            }).catch(err => {
                window.alert(err.response.data.messages);
            })
    } else {
      window.alert('Please enter a valid IP address');
    }
  }

  return (
    <div className={style.containerSearch}>
      <TextField
        id="search"
        color="info"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        placeholder="Search for any IP address or domain"
        InputProps={{
          style: {
            color: "black",
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "0px",
            borderTopRightRadius: "0px",
            backgroundColor: "white",
            color: "black",
            height: "50px",
          },
        }}
      />
      <IconButton aria-label="search" onClick={handleSearch} className={style.buttonIcon} sx={{ backgroundColor: "black", color: "white", borderTopRightRadius: "15px", borderBottomRightRadius: "15px", borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', '&:hover': { bgcolor: 'grey' } }}>
        <ChevronRightIcon color="inherit" />
      </IconButton>
    </div>

  )
}

export default SearchBar