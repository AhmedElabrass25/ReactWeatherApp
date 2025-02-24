import { useContext } from "react";
import { BsSendFill } from "react-icons/bs";
import { WeatherContext } from "../context/WeatherContext";

const HourlyForeCast = ({ data }) => {
  const { theUnits } = useContext(WeatherContext);

  const { date, icon, wind, precipitation, temperature } = data;
  const locale = navigator.language || "en-EG"; // Default to English (Egypt)
  // Get today's formatted date
  const now = new Date();
  const now_data = {
    day: new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }).format(now),
    time: new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(now),
  };

  // Format the given weather date
  const weatherDateObj = new Date(date);
  const weather_date = {
    day: new Intl.DateTimeFormat(locale, {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    }).format(weatherDateObj),
    time: new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(weatherDateObj),
  };

  // More reliable comparison using YYYY-MM-DD
  const todayStr = now.toISOString().split("T")[0];
  const weatherStr = weatherDateObj.toISOString().split("T")[0];

  if (todayStr === weatherStr) {
    weather_date.day = "Today";
  }

  return (
    <div className="px-4 py-2 border-[1px] border-[var(--border-color)] rounded-[20px] flex flex-col justify-center items-center w-[200px]">
      <p className="mb-1">{weather_date.day}</p>
      <p className="mb-1">{weather_date.time}</p>

      <p>{}</p>
      <div className="icon">
        <img src={`weather_icons/set04/big/${icon}.png`} alt="icon" />
      </div>
      <p className="text-lg">
        {Math.round(temperature)} {theUnits.temperature}
      </p>
      <div className="precipitation">
        {Math.round(precipitation?.total)}
        {theUnits.precipitation}
      </div>
      <div className="wind flex items-center">
        <span className="me-2">
          {Math.round(wind?.speed)} {theUnits.wind_speed}
        </span>
        <BsSendFill
          style={{ transform: `rotate(${wind?.angle}deg)` }}
          className=""
        />
      </div>
    </div>
  );
};

export default HourlyForeCast;
