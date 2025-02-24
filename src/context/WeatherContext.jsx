import { createContext, useEffect, useState } from "react";
import { defaultPlace, measurment_system, units } from "../utils/DefaultPlace";
import { getWeather } from "../api/getWeather";
export const WeatherContext = createContext(0);
const WeatherContextProvider = ({ children }) => {
  const [place, setPlace] = useState(defaultPlace);
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForcast, setHourlyForcast] = useState([]);
  const [daiyForcast, setDaiyForcast] = useState([]);
  const [measurmentSystem, setMeasurmentSystem] = useState(
    measurment_system.AUTO
  );
  const [theUnits, setTheUnits] = useState({});
  async function getWeatherData() {
    try {
      setLoading(true);
      const cw = await getWeather("current", place.place_id, measurmentSystem);
      setTheUnits(units[cw.units]);
      setCurrentWeather(cw.current);
      const hf = await getWeather("hourly", place.place_id, measurmentSystem);
      setHourlyForcast(hf.hourly.data);
      const df = await getWeather("daily", place.place_id, measurmentSystem);
      setDaiyForcast(df.daily.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getWeatherData();
  }, [place, measurmentSystem]);

  return (
    <WeatherContext.Provider
      value={{
        place,
        setPlace,
        loading,
        daiyForcast,
        hourlyForcast,
        currentWeather,
        setMeasurmentSystem,
        measurmentSystem,
        theUnits,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
