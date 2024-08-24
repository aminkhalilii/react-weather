import { useCallback, useContext, useEffect, useState } from "react";
import WeatherItem from "../components/WeatherItem";
import { cities } from "../data/cities";

import { Link } from "react-router-dom";
import { WeatherContext } from "../contexts/WeatherContext";
const Weathers = () => {
	const [weathersData, setWeathersData] = useState([]);
	const [citiesItems, setCities] = useState(
		cities.filter((c) => c.country === "Iran").slice(0, 10)
	);

	const {getData,loading} = useContext(WeatherContext)

	const showData = useCallback(() => {
		const arr = [];
		if (citiesItems.length > 20) citiesItems.splice(20);
		citiesItems.map(async (city) => {
			let data = await getData(city.city);
			if (data?.current) arr.push(data);
			setWeathersData(arr);
		});
	}, [citiesItems, setWeathersData,getData]);

	// useLayoutEffect(() => {
	useEffect(() => {
		showData();
	}, [showData]);

	
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
						<WeatherItem  weather={weather} key={index} />
					</Link>
				))}
		</div>
	);
};

export default Weathers;
