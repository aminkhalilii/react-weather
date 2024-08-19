import bg from "../images/bg.svg";
import house from "../images/house.svg";
const Weather = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">Montreal</h1>
          <h1 className="mb-5 text-5xl font-bold text-white">19</h1>
          <p className="mb-0 font-bold">
            Mostly Clear
          </p>
          <p className="flex justify-center gap-4">
            <span>H:24</span>
            <span>L:14</span>
          </p>
          <img alt="weather" src={house} className="mx-auto max-w-64 mt-12"  />
        </div>
      </div>
    </div>
  )
}

export default Weather