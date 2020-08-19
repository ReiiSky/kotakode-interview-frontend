import React from "react";  
import { useEffect, useState } from "react";
import { BASE_URL } from "./constant";

export default function Link({baseLink}) {
  let [tasks, setstate] = useState([]);
  useEffect(async ()=>{
    let fetched = await fetch(BASE_URL+"/activities/group");
    let {list} = await fetched.json()
    setstate(list)
  }, [])
  return (
    <div>
      <li><a href={"/"}>*</a></li>
        {
            Object.entries(tasks).map((v)=>{
            return (<li><a href={baseLink+v[1]}>{v[1]}</a></li>)
            })
        }
    </div>
  );
}
