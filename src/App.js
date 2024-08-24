import { Route, BrowserRouter, Routes } from "react-router-dom";
import Weather from "./pages/Weather";
import "./App.css";
import Weathers from "./pages/Weathers";
import { WeatherContextProvider } from "./contexts/WeatherContext";

function App() {
	return (
		<WeatherContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Weathers />} />
					<Route path="/weather/:city" element={<Weather />} />
				</Routes>
			</BrowserRouter>
		</WeatherContextProvider>
	);
}

export default App;
