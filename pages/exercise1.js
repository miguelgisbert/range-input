"use client"
import Range from "../src/app/components/range"; 
import "../src/app/globals.css";

export default function Exercise1() {
  return (
      <div style={{width: "100%", height: "300px", display: "flex", alignContent:"center", flexWrap:"wrap", alignItems:"center", justifyContent: "center"}}>
          <Range min={5.99} max={70.99} />
      </div>
  );
}