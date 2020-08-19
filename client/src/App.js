import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';
import Links from './links';
import { BASE_URL } from "./constant";
import { parse } from "querystring";

async function PushActivity() {
  let title = document.getElementById("title").value;
  let group = document.getElementById("grup").value;
  let detail = document.getElementById("detail").value;
  let priority = parseInt(document.getElementById("priority").value);
  let fetched = await fetch("http://localhost:6007/api/v1/activities", {
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "body": JSON.stringify({title, group, detail, priority})
  })
  window.location = window.location;
}

function App() {
  let [tasks, setstate] = useState([]);
  useEffect(async ()=>{
    let urlParsed = parse(window.location.search.replace("?", ""));
    let url = BASE_URL;
    if(urlParsed.group) {
      url += `/activities/group/${urlParsed.group}`;
    } else if(urlParsed.priority) {
      url += `/activities/priority/${urlParsed.priority}`;
    } else {
      url += "/activities";
    }
    let fetched = await fetch(url);
    let result = await fetched.json()
    setstate(result.list)
  }, [])
  return (
    <div className="App">
      <h1>Pekerjaan Rumah Yang Perlu Dilakukan</h1>
      <Links  baseLink={"/?group="} parameter={["all", "boring"]} /> <br/> <br/>
      <input id="title" placeholder="judul"/>
      <br/> <br/>
      <input id="grup" placeholder="grup"/>
      <br/> <br/>
      <textarea  id="detail" placeholder="detail"/>
      <br/> <br/>
      <select name="priority" id="priority">
        <option value="0">Biasa</option>
        <option value="1">Cukup penting</option>
        <option value="2">Penting</option>
      </select>
      <button onClick={PushActivity}>Tambah</button>
      <TodoList tasks={tasks} />
    </div>
  );
}

export default App;