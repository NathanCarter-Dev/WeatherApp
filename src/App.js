import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/Cloud';

const api = {
  key: "74c5b7afc45c797f3eabda0160f38e29",
  base: "https://api.openweathermap.org/data/2.5/"
}

let icon = ("<img src='http://openweathermap.org/img/wn/'" + "y" + "@2x.png>");
      

function App() {

  const[query, setQuery] = useState('');
  const [savedWeather] = useState(localStorage.getItem('key')) //save currently searched weather into local storage
  const [savedIcon] = useState(localStorage.getItem('icon'))
  const[weather, setWeather] = useState('{}');

  //Get weather request
  const search = evt => {
    if(evt.key ==="Enter") {
      //query weather base asking for weather
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      //parse json response
      .then(res=> res.json())
      //set weather to result
      .then(result => {
        setQuery('');
        setWeather(result);
        icon = "http://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png"
      })
    }
  }

  //Get the date variables and return object to text
  const dateBuilder = (d) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    //
    return `${day} ${date} ${month} ${year}`
  }

  useEffect(() => {
    const data = window.localStorage.getItem('key')

    if(data !== null) {



      setWeather(JSON.parse(savedWeather)); //set the weather to local storage configuration
      icon = savedIcon;
    }

  }, [])

  //save state with useEffect updates
   useEffect(() => {
    window.localStorage.setItem('key', JSON.stringify(weather))
    window.localStorage.setItem('icon', (icon))

    }, [weather])

    if(weather !== null) {
      
    }

  return (
    
    <div className=
    {(typeof weather.main != "undefined") // if app is undefined set weather to 'app'  
      ? ((weather.main.temp > 16) 
        ? 'app warm' //if app temperature is above 16 set app theme to warm
        :'app') 
        : 'app'}>
      <main>
        
        <div className="search-box">
          <TextField id="standard-basic" label="Enter a town or city" variant="standard"
          
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}
          />
          <SearchIcon id="search-icon"/>
        </div>
        <div className="container">


        
        {(typeof weather.main != "undefined") ? (
          
        <div className="weather-attributes">
        
            
          <div className="weather-box">        
            <div className="weather">{weather.weather[0].main}</div>
            <img src={icon}></img>
         </div>
          <div className="location-box">     
          <div className="location">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="temp">{Math.round(weather.main.temp)}°c</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>



        </div>
        ) : ('')}
</div>
      </main>
    </div>
  );
}

export default App;
