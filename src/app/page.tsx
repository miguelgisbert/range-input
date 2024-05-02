"use client"
import styles from "./page.module.css";
import Range from "./components/range"; 

export default function Home() {
  return (
    <div style={{width: "100%", height: "300px", display: "flex", alignContent:"center", flexWrap:"wrap", alignItems:"center", justifyContent: "center"}}>
        <Range min={1} max={100} />
    </div>
  );
}
