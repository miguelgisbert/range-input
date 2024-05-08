"use client"
import React, {useEffect, useState} from 'react';
import Range from "./components/range"; 
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {

  const [data, setData] = useState({ min: 0, max: 0, selectableValues: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://demo1792323.mockable.io/mg-range-input')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></div>;;
  }

  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "30px", alignContent:"flex-start", alignItems:"center", justifyContent: "center"}}>
        <h3 style={{ padding: "20px" }}>Exercise 1</h3>
        <Range min={5.99} max={19.99} />
        <h3 style={{ padding: "20px" }}>Exercise 2</h3>
        <Range min={data.min} max={data.max} selectableValues={data.selectableValues} />
    </div>
  );
}
