import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Outlet, useParams, Link } from "react-router-dom";
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
console.log(ACCESS_KEY);
function App() {
  const [list, setList] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [fullDetails, setFullDetails] = useState(null);
  let params = useParams();
  
  
 

  
  
  params = useParams();

  
  console.log(params.data);
  useEffect(() => {
    
    const fetchAllWeatherData = async () => {
   
      const fetchWeatherData = await fetch(`https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-10-01&end_date=2023-10-23&key=${ACCESS_KEY}`);
    
      const fetchDetail = await fetch(`https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-10-01&end_date=2023-10-23&key=${ACCESS_KEY}`);

    const json = await fetchWeatherData.json();
    setList(json);
    const json1 = await fetchDetail.json();
    setFullDetails(json1);
  };
  

    fetchAllWeatherData().catch(console.error);
  }, []);

  
  
const Detail = () => {
    params = useParams();
    var x = params.data.substring(params.data.length -2) - 1;
    
    
    return (
      <>
        <div className='al'>
        <div className = "side">
      <h1>🔍WeatherData</h1>
      <br></br>
      <h3><Link to="/">🏠 Dashboard</Link></h3>
      <h3>🔍 Search</h3>
      <h3>ℹ️  About</h3>
      </div>
          
          <div className='div11'>
            <h1>Details</h1>
            <h3>Date: {params.data} </h3>
            <h3>Wind Speed: {fullDetails.data[x].wind_spd}</h3>
            <h3>Wind Direction: {fullDetails.data[x].wind_dir}</h3>
            <h3>Clouds:{fullDetails.data[x].clouds}  </h3>
          </div>
        </div>
      </>
    )
  }
  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.data.filter(item =>
        item.datetime.includes(searchValue)
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list.data);
    }
  };

  const highestTemp = list && list.data.reduce((prev, curr) => prev.max_temp > curr.max_temp ? prev : curr);
  console.log(highestTemp.max_temp);
  const lowestTemp = list && list.data.reduce((prev, curr) => prev.min_temp < curr.min_temp ? prev : curr);
  console.log(lowestTemp.min_temp);
  const averageTemp = list && list.data.reduce((acc, curr) => acc + curr.temp, 0) / list.data.length;
  
 

  
  const NoMatch = () => ( <h1>No Match</h1>)
  const Home = () => {
    return (
      <>
      <div className= "al">
      <div className = "side">
      <h1>🔍WeatherData</h1>
      <br></br>
      <h3><Link to="/">🏠 Dashboard</Link></h3>
      <h3>🔍 Search</h3>
      <h3>ℹ️  About</h3>
      </div>
       
       <div>
       <div>
       
       <div className="div">
       <div className="div1">
       <h2>{averageTemp.toFixed(1)} °C</h2>
       <p>Average Temperature: </p> 
       <h3></h3>
       </div>
       <div className="div2">
       <h2>{highestTemp.max_temp}</h2>
       <p>Highest Temperature</p>
       </div>
       <div className="div2">
       <h2>{lowestTemp.min_temp}</h2>
       <p>Lowest Temperature</p>
       </div>
       </div>
       
       <div className="intab">
       <h2 className='tx'>City: {list.city_name}, TimeZone: {list.timezone}</h2>
       <input
  type="text"
  placeholder="Search Date"
  onChange={(inputString) => searchItems(inputString.target.value)}
/>
       
       <table border="0" className = "table1">
       
    <tr>
        <th>Date</th>
        <th>Max Temp</th>
        <th>Mini Temp</th>
        <th>Temperature</th>
        <th>Detail</th>
    </tr>
    
  
      {searchInput.length > 0
                ? filteredResults.map((item) => (
                  <tr key={item.datetime}>
                    <td>{item.datetime}</td>
                    <td>{item.max_temp}</td>
                    <td>{item.min_temp}</td>
                    <td>{item.temp}</td>
                    <td><Link to="/Detail">🔗</Link></td>
                  </tr>
                ))
                : 
        list && list.data.map((item) => (

        
        <tr key={item.datetime}>
        
          <td>{item.datetime}</td>
          <td>{item.max_temp}°C</td>
          <td>{item.min_temp}°C</td>
          <td>{item.temp}°C</td>
          <td><Link to={item.datetime}>🔗</Link></td>
        </tr>
        
      ))}
      
      </table>
      </div>
    </div>
       </div>
      </div>
      <Outlet />
      </>
    )
  }

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" caseSensitive={true} element={<Home />}/>
          <Route path="/:data" Component={Detail}>
          </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
