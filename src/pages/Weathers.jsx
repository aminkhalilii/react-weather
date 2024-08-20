import { useEffect, useState } from "react";
import WeatherItem from "../components/WeatherItem";
import cities from "cities.json";
import sunny from "../images/Sun cloud angled rain.png";
import partlyCloud from "../images/Moon cloud fast wind.png";
import overcast from "../images/Moon cloud fast wind.png";
const Weathers = () => {
	const [weathersData, setWeathersData] = useState([]);
	const [citiesItems, setCities] = useState(
		cities.filter((c) => c.country === "IR").slice(0, 50)
	);

	// const tsadasdas = async () => {
	// 	const dsds = [];
	// 	for (const city of citiesItems) {
	// 		const data = await getData(city.name);
	// 		if(data.location){
	// 			dsds.push(data);
	// 		}
	// 	}
	// 	return dsds;
	// };

	useEffect(() => {
		
		citiesItems.map(async (city)=>{
			const data = await getData(city.name);
			if(data.current) setWeathersData([...weathersData,data])
		})
		console.log(weathersData);

	}, []);

	const getData = async (city) => {
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
		return data;
	};
	const search = (e) => {
		const value = e.target.value;
		if (value) {
			const newCities = cities.filter((c) =>
				c.name?.toLowerCase().includes(value)
			);
			setCities(newCities);
		} else {
			setCities((c) => c.country === "IR").slice(0, 50);
		}
	};

	return (
		<div className="flex flex-wrap justify-center w-full gap-4 bg-[#373d68] py-12 px-6">
			<label className="input input-bordered flex items-center gap-2">
				<input
					type="text"
					onKeyUp={search}
					className="grow"
					placeholder="Search"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					fill="currentColor"
					className="h-4 w-4 opacity-70"
				>
					<path
						fillRule="evenodd"
						d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
						clipRule="evenodd"
					/>
				</svg>
			</label>
			{weathersData?.map((city, index) => (
				<WeatherItem city={city} key={index} />
			))}
		</div>
	);
};

export default Weathers;
