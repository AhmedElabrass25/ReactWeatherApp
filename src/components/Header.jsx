import { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdLightMode, MdNightlightRound } from "react-icons/md";
import { WeatherContext } from "../context/WeatherContext";
import { GoGear } from "react-icons/go";
import { BsGearFill } from "react-icons/bs";
import { measurment_system } from "../utils/DefaultPlace";
import { findPlaceFunc } from "../api/getWeather";

// console.log(measurment_system);
const Header = () => {
  const [text, setText] = useState("");
  const { setPlace, place, measurmentSystem, setMeasurmentSystem } =
    useContext(WeatherContext);
  const [openSetting, setOpenSetting] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("currentMode") || "light"
  );
  const [searchResult, setSearchResult] = useState([]);
  const [openSearchRsult, setOpenSearchResult] = useState(false);
  // Search function
  async function searchFun(e) {
    setText(e.target.value);
    const data = await findPlaceFunc(e.target.value);
    setSearchResult(data);
    setOpenSearchResult(e.target.value.trim().length > 0 ? true : false);
  }
  console.log(searchResult);
  // Select a city from search results
  function changePlaceFunc(res) {
    setPlace(res);
    setText(" ");
    setOpenSearchResult(false);
  }
  // change Mode function
  function changeMode() {
    localStorage.setItem("currentMode", theme === "dark" ? "light" : "dark");
    setTheme(localStorage.getItem("currentMode"));
  }
  useEffect(() => {
    if (theme == "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [theme]);
  return (
    <header className="bg-[var(--header-bg-color)] text-[var(--primary-text-color)] py-5 sticky w-full top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="row justify-between">
          {/* <<<<<< PLace >>>>>>>>>> */}
          <div className="place flex items-center gap-[2px] w-fit">
            <FaLocationDot className="text-xl" />
            <p className="font-bold">{place?.name} , </p>
            <span> {place?.country}</span>
          </div>
          {/* <<<<<< Shearch >>>>>>>>>> */}
          <div className="place w-full text-center mt-5 md:w-[400px] md:order-none order-3 md:mt-0 relative">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoSearch className="w-4 h-4 text-gray-500" />
              </div>
              <input
                onChange={searchFun}
                value={text}
                type="search"
                className="block w-full px-4 py-2.5 ps-10 text-[16px] text-[var(--primary-text-color)] bg-[var(--main-bg-color)] border border-[var(--border-color)] rounded-md  outline-none"
                placeholder="Search City"
                required
              />
            </div>
            {openSearchRsult && (
              <div className="searchResult absolute top-[65px] right-0 w-[80%] md:w-[400px] h-[300px] overflow-y-auto bg-[var(--main-bg-color)] border-[1px] border-[var(--border-color)] rounded-md">
                <div className="content">
                  {searchResult.map((res) => {
                    return (
                      <div
                        onClick={() => changePlaceFunc(res)}
                        key={res.place_id}
                        className="cursor-pointer border-b-[1px] border-[var(--border-color)] text-[18px] text-[var(--primary-text-color)] py-3"
                      >
                        {res.name}
                        {res.adm_area1}
                        {res.country}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/*<<<<<<<< Change Mode >>>>>>>>>*/}
          <div className="flex items-center gap-5">
            <button
              className="w-fit flex justify-end border-[1px] border-[var(--border-color)] p-2"
              onClick={changeMode}
            >
              {theme === "dark" ? (
                <MdNightlightRound className="text-2xl -rotate-[30deg]" />
              ) : (
                <MdLightMode className="text-2xl" />
              )}

              {/* <MdDarkMode /> */}
            </button>
            {/* Setting */}
            <div className="relative mb-0 pb-0">
              <button
                onClick={() => setOpenSetting(!openSetting)}
                className="text-2xl cursor-pointers p-2 border-[1px] border-[var(--border-color)]"
              >
                {openSetting ? <BsGearFill /> : <GoGear />}
              </button>
              <div
                className={`absolute top-[53px] right-[15px] p-3 bg-[var(--main-bg-color)] border-[1px] border-[var(--border-color)] rounded-md z-50 shadow-lg transition-transform duration-300 ${
                  openSetting
                    ? "scale-110 opacity-100"
                    : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <div className="w-[300px]">
                  <h1 className="text-lg mb-2 capitalize w-full text-center">
                    measurment system
                  </h1>
                  <div className="flex items-center gap-2">
                    {Object.values(measurment_system).map((sys, index) => {
                      return (
                        <span
                          defaultValue={measurmentSystem}
                          key={index}
                          onClick={() => {
                            setMeasurmentSystem(sys);
                            setOpenSetting(false);
                          }}
                          className={`p-2 rounded-[10px] border-[1px] border-[var(--border-color)] capitalize cursor-pointer ${
                            measurmentSystem === sys ? "active" : ""
                          }`}
                        >
                          {sys}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
