"use client"
import Range from "./components/range"; 

export default function Home() {
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "30px", alignContent:"flex-start", alignItems:"center", justifyContent: "center"}}>
        <h3 style={{ padding: "20px" }}>Exercise 1</h3>
        <Range min={5.99} max={19.99} selectableValues={[0,10,20,30,40,50,60,70,80,90,100]} />
        <h3 style={{ padding: "20px" }}>Exercise 2</h3>
        <Range min={5.99} max={70.99} selectableValues={[5.99, 10.99, 30.99, 50.99, 70.99]}/>
    </div>
  );
}
