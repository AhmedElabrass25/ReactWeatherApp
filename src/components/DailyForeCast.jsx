import { useContext } from "react";
import { BsSendFill } from "react-icons/bs";
import { WeatherContext } from "../context/WeatherContext";

const DailyForeCast = ({ data }) => {
  const { theUnits } = useContext(WeatherContext);
  const { day, temperature_max, temperature_min, wind, precipitation, icon } =
    data;
  const locale = navigator.language || "en-EG"; // Default to English (Egypt)
  // Get today's formatted date
  const now = new Date();
  // console.log(now);
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

  const weatherDateObj = new Date(day);
  // console.log(weatherDateObj);
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
  console.log(todayStr);
  console.log(weatherStr);

  if (todayStr === weatherStr) {
    weather_date.day = "Today";
  }

  return (
    <div className="px-4 py-2 border-[1px] border-[var(--border-color)] rounded-[20px] w-[200px] flex flex-col justify-center items-center ">
      <p className="mb-1">{weather_date.day}</p>

      <p>{}</p>
      <div className="icon">
        <img src={`weather_icons/set04/big/${icon}.png`} alt="icon" />
      </div>
      <p className="text-lg">
        max : {Math.round(temperature_max)} {theUnits.temperature}
      </p>
      <p className="text-lg">
        min : {Math.round(temperature_min)} {theUnits.temperature}
      </p>

      <div className="precipitation">
        {Math.round(precipitation?.total)} {theUnits.precipitation}
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

export default DailyForeCast;
