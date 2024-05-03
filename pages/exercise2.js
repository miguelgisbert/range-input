"use client"
import Range from "../src/app/components/range"; 
import "../src/app/globals.css";

export default function Exercise1() {
  return (
      <div style={{width: "100%", height: "300px", display: "block"}}>
          <Range min={5.99} max={70.99} selectableValues={[5.99, 10.99, 30.99, 50.99, 70.99]}/>
      </div>
  );
}