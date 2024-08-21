import { useParams } from "react-router-dom";
import bg from "../images/bg.svg";
import { useEffect, useState } from "react";
import sunny from "../images/Sun cloud angled rain.svg";
import partlyCloud from "../images/Moon cloud fast wind.svg";
import overcast from "../images/Moon cloud fast wind.svg";
import { Link } from "react-router-dom";
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const { city } = useParams();
  useEffect(() => {
    const getData = async () => {
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
        setWeather(data);
      } catch (error) {
        console.log(error);
        return;
      }
    };
    getData();
  }, []);
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="navbar absolute top-0 bg-slate-800">
        <div className="flex-1">
          <Link to="/" className=" flex text-xl text-white">
          <svg class="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
            <span class="">Weathers</span>
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">
            {weather?.location.name} / {weather?.location.country}
          </h1>
          <h1 className="mb-5 text-5xl font-bold text-white">
            {weather?.current.temp_c}
          </h1>
          <p className="mb-0 font-bold">
            {weather?.current?.condition?.text}({weather?.current?.cloud}%)
          </p>
          <p className="flex justify-center gap-4">
            <span>H:24</span>
            <span>L:14</span>
          </p>
          <img
            alt="weather"
            src={weather?.statusImage}
            className="mx-auto max-w-64 mt-12"
          />
        </div>
      </div>
    </div>
  );
};

export default Weather;
