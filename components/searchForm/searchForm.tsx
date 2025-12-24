"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./searchForm.module.css";

export default function SearchForm(){
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleClick = ()=>{
        console.log("search: ", search.trim());
        
        if(search?.trim()){
            router.push(`/tools?search=${search}`);
        }
    }

    const handleKeyDown = (e:React.KeyboardEvent) => {
        if(e.key === "Enter") {
            handleClick();
        }
    }


    return <div className={styles.searchBox}>
          <input 
          className={styles.input} 
          name="search"
          value={search}
          type="text" 
          placeholder="Дриль алмазного свердління" 
          onChange={(e)=>setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          />
          <button onClick={handleClick} className={styles.button}>Пошук</button>
        </div>
}