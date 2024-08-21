import reactangle from "../images/reactangle.png";

const WeatherItem = ({ weather }) => {


	return (
		<div
			className="w-full flex justify-between bg-[#2E335A] rounded-[40px] shadow-md p-8"
			style={{
				backgroundImage: `url(${reactangle})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<div className="w-1/2 flex flex-col gap-2">
				<h2 className="font-bold text-white text-5xl">
					{weather?.current?.temp_c}
				</h2>

				<p className="flex text-gray-300 gap-4">
					<span>H:24</span>
					<span>L:14</span>
				</p>
				<p className="mb-0  text-white">
					{weather?.location?.name}, {weather?.location?.country}
				</p>
				<p className="mb-0 text-sm text-gray-300">
					UV : {weather?.current?.uv}
				</p>
				<p className="mb-0 text-sm text-gray-300">
					co : {weather?.current?.uv}
				</p>
			</div>
			<div className="flex flex-col items-center">
				{<img src={weather.statusImage} className="w-34 h-34" alt="house" />}
				<p className="mb-0 font-bold text-gray-300">
					{weather?.current?.condition?.text}({weather?.current?.cloud}%)
				</p>
			</div>
		</div>
	);
};

export default WeatherItem