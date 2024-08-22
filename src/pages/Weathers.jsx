import { useCallback, useEffect, useState } from "react";
import WeatherItem from "../components/WeatherItem";
import { cities } from "../data/cities";
import sunny from "../images/Sun cloud angled rain.svg";
import partlyCloud from "../images/Moon cloud fast wind.svg";
import overcast from "../images/Moon cloud fast wind.svg";
import { Link } from "react-router-dom";
const Weathers = () => {
	const [weathersData, setWeathersData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [citiesItems, setCities] = useState(
		cities.filter((c) => c.country === "Iran").slice(0, 10)
		// [{ city: "Tehran" }, { city: "Karaj" }]
	);

	useEffect(() => {
		showData2();
	}, []);
	const showData2 = useCallback(() => {
		showData();
	}, [citiesItems,weathersData]);
	const showData = () => {
		const arr = [];
		if (citiesItems.length > 20) citiesItems.splice(20);
		citiesItems.map(async (city) => {
			let data = await getData(city.city);
			if (data?.current) arr.push(data);
			setWeathersData(arr);
		});
	};
	const getData = async (city) => {
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
	const search = (e) => {
		const value = e.target.value.toLowerCase();
		setTimeout(() => {}, 1000);
		if (value) {
			let newCities = cities.filter((c) =>
				c.city?.toLowerCase().includes(value)
			);
			setCities(newCities);
			showData();
		} else {
			setCities(cities.filter((c) => c.country === "Iran").slice(0, 10));
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
			<div className="w-full flex justify-center">
				{loading && <i className="loading w-16"></i>}
			</div>
			{!loading &&
				weathersData?.map((weather, index) => (
					<Link className="w-full" to={`/weather/${weather?.location?.name}`}>
						<WeatherItem weather={weather} key={index} />
					</Link>
				))}
		</div>
	);
};

export default Weathers;
