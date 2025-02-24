import CurrentWeather from "./CurrentWeather";
import ForeCast from "./ForeCast";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const Main = () => {
  const { daiyForcast, hourlyForcast } = useContext(WeatherContext);

  return (
    <main className="bg-[var(--main-bg-color)] text-[var(--primary-text-color)] py-5">
      <div className="container">
        <CurrentWeather />
        <ForeCast type="hourly" title="hourly forecast" data={hourlyForcast} />
        <ForeCast type="daily" title="21 days forecast" data={daiyForcast} />
      </div>
    </main>
  );
};

export default Main;
