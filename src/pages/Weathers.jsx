
import WeatherItem from "../components/WeatherItem";
import { cities } from "../data/cities";
const Weathers = () => {
  const cityItems = cities.slice(0, 10);
  return (
    <div className="flex flex-wrap justify-center w-full gap-4 bg-[#373d68] py-12 px-6">
        {cityItems.map((city,index)=>(
           <WeatherItem key={index} city={city} />
        ))}
      
    </div>
  );
};

export default Weathers;
