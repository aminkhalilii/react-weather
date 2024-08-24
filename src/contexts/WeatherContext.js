import {  createContext, useState } from "react"
import sunny from "../images/Sun cloud angled rain.svg";
import partlyCloud from "../images/Moon cloud fast wind.svg";
import overcast from "../images/Moon cloud fast wind.svg";
export const WeatherContext = createContext(null)
export const WeatherContextProvider = ({children})=>{
const [loading, setLoading] = useState(true);

  const getData = async (city) => {
    setLoading(true)
		try {
			const res = await fetch(
				`https://api.weatherapi.com/v1/current.json?key=ba1e4f43792f443397870110242008&q=${city}&aqi=yes`
			);
			const data = await res.json();
			let statusImage = "";
			switch (data?.current?.condition?.text) {
				case "Sunny":
					statusImage = sunny;
					break;
				case "Partly cloudy":
					statusImage = partlyCloud;
					break;
				case "Overcast":
					statusImage = overcast;
					break;

				default:
					statusImage = data?.current?.condition?.icon;
					break;
			}
			data.statusImage = statusImage;
			setLoading(false);

			return data;
		} catch (error) {
			console.log(error);
			setLoading(false);

			return;
		}
	};
  return (
    <WeatherContext.Provider value={{getData,loading,setLoading}}>
        {children}
    </WeatherContext.Provider>
  )
}