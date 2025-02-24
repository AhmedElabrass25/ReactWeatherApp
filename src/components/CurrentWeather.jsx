import {
  BsCloudsFill,
  BsDroplet,
  BsMoisture,
  BsSunglasses,
} from "react-icons/bs";
import { GiWindSlap } from "react-icons/gi";
import { IoEyeOutline } from "react-icons/io5";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
const CurrentWeather = () => {
  const { theUnits, currentWeather } = useContext(WeatherContext);
  console.log(theUnits);
  const data = currentWeather;
  console.log(data);
  const {
    cloud_cover,
    feels_like,
    humidity,
    icon_num,
    visibility,
    temperature,
    precipitation,
    uv_index,
    summary,
    wind,
  } = data;
  const otherInfoWidgets = [
    {
      id: 0,
      icon: <BsDroplet />,
      name: "Precipitation",
      value: Math.round(precipitation?.total),
      unit: theUnits.precipitation,
    },
    {
      id: 1,
      icon: <GiWindSlap />,
      name: "Wind",
      value: Math.round(wind?.speed),
      unit: theUnits.wind_speed,
    },
    {
      id: 2,
      icon: <BsMoisture />,
      name: "Humidity",
      value: Math.round(humidity),
      unit: theUnits.humidity,
    },
    {
      id: 3,
      icon: <BsSunglasses />,
      name: "UV index",
      value: Math.round(uv_index),
      unit: theUnits.uv_index,
    },
    {
      id: 4,
      icon: <BsCloudsFill />,
      name: "Clouds cover",
      value: Math.round(cloud_cover),
      unit: theUnits.cloud_cover,
    },
    {
      id: 5,
      icon: <IoEyeOutline />,
      name: "Visibility",
      value: Math.round(visibility),
      unit: theUnits.visibility,
    },
  ];
  return (
    <section>
      <div className="container">
        <div className="row justify-between">
          <div className="temp w-full md:w-[23%] p-3 border-[1px] border-[var(--border-color)] rounded-[20px] mb-5">
            <img src={`weather_icons/set04/big/${icon_num}.png`} alt="image" />
            <div>
              <h1 className="text-5xl mb-2">
                {temperature} {theUnits.temperature}
              </h1>
              <p className="text-[16px] text-[var(--secondary-text-color)] mb-2">
                {" "}
                Feels like {feels_like} {theUnits.temperature}
              </p>
              <h3 className="text-2xl tracking-[0.5px]">{summary}</h3>
            </div>
          </div>
          {/* Other Information */}
          <div className="otherInfo w-full md:w-[70%] p-3 border-[1px] border-[var(--border-color)] rounded-[20px] mb-5">
            <div className="row">
              {otherInfoWidgets.map((info) => {
                return (
                  <div key={info.id} className="w-full md:w-[48%] p-2 fl">
                    <div className="w-full flex justify-start flex-col items-center">
                      <div className="flex items-center gap-1">
                        <span> {info.icon}</span>
                        <span>
                          {info.value} {info.unit}
                        </span>
                      </div>
                      <div>{info.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
