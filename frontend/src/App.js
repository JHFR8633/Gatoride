import { useState, useEffect } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {

   // new line start
  const [homeData, setHomeData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/home",
    })
    .then((response) => {
      const res =response.data
      setHomeData(({
        home_name: res.name,
        about_project: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    //end of new line 
    useEffect(() => {
      getData();
    }, []);
    return (
      <div className='App'>
        <header>
          {homeData && (
            <>
              <div>Name: {homeData.home_name}</div>
              <p>About: {homeData.about_project}</p>
            </>
          )}
        </header>
      </div>
    );
  }


export default App;

