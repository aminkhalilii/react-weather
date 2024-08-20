import reactangle from "../images/reactangle.png";

const WeatherItem = ({ city }) => {


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
					{city?.current?.temp_c}
				</h2>

				<p className="flex  gap-4">
					<span>H:24</span>
					<span>L:14</span>
				</p>
				<p className="mb-0  text-white">
					{city?.location?.name}, {city?.location?.country}
				</p>
				<p className="mb-0 text-sm text-gray-300">
					UV : {city?.current?.uv}
				</p>
				<p className="mb-0 text-sm text-gray-300">
					co : {city?.current?.uv}
				</p>
			</div>
			<div className="flex flex-col items-center">
				{<img src={city.statusImage} className="w-34 h-34" alt="house" />}
				<p className="mb-0 font-bold">
					{city?.current?.condition?.text}({city?.current?.cloud}%)
				</p>
			</div>
		</div>
	);
};

export default WeatherItem