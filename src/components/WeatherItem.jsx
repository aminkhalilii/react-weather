import reactangle from "../images/reactangle.png";
import house from "../images/house.svg";
import { useEffect, useState } from "react";
const WeatherItem = ({city}) => {
  
    const [data,setData] = useState({})
    useEffect( ()=>{
        const getData = async()=>{
            const res = await fetch(`https://weatherapi-com.p.rapidapi.com?q=tehran`)
            const data = await res.json()
            setData(data)
            navigator.geolocation.getCurrentPosition(( position => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                getWeather(lat, long)
            }));

            const getWeather = (lat, long) => {
                const apiKey = '248d369aa6322178f4f2620b2da7f29c';
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
                fetch(url).
                then(response => response.json())
                .then(weather => {
                    console.log(weather)
                   
                }).catch(err => {
                   
                })
            }
        }
        
        getData();
    },[])
   
  return (
    <div
    className="w-full flex bg-[#2E335A] rounded-[40px] shadow-md p-12"
    style={{
      backgroundImage: `url(${reactangle})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
  >
    <div className="w-1/2 flex flex-col gap-2">
      <h2 className="font-bold text-white text-5xl">19</h2>
      <p className="mb-0 font-bold">Mostly Clear</p>
      <p className="flex  gap-4">
        <span>H:24</span>
        <span>L:14</span>
      </p>
      <p className="mb-0  text-white"> {city.city}, {city.country}</p>
    </div>
    <div className="flex justify-center">
      <img src={house} className="max-w-64 w-1/2" alt="house" />
    </div>
  </div>
  )
}

export default WeatherItem