"use client"
import styles from "./page.module.css";
import Range from "./components/range"; 

export default function Home() {
  return (
        <Range min={1} max={100} />
  );
}
