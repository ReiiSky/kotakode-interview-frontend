import React from "react";
import { BASE_URL } from "./constant";


let deleteActivity = async (id) => {
  
  await fetch(BASE_URL+"/activities/"+id, {method: "DELETE"})
  window.location = window.location;
}

export default function TodoList({tasks}) {
  return (
    <div>
      {
        Object.entries(tasks).map(value => {
          let color = "color:"+ (value[1].priority == 0 ? "red" : value[1].priority == 1 ? "yellow": "green");

          return <li>
            {value[1].title}: {value[1].detail}
            <button onClick={() => deleteActivity(value[1].id)}>Hapus</button></li>
        })
      }
    </div>
  );
}
