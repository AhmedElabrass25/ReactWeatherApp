import Slider from "react-slick";
import DailyForeCast from "./DailyForeCast";
import HourlyForeCast from "./HourlyForeCast";

const ForeCast = ({ type, title, data }) => {
  return (
    <section className="pt-10">
      <div className="container">
        <h3 className="text-3xl capitalize mb-5">{title}</h3>
        <div className="row md:justify-between justify-center gap-4">
          {data?.map((info) => {
            return (
              <div key={info.date || info.day}>
                {type === "hourly" ? (
                  <HourlyForeCast data={info} />
                ) : (
                  <DailyForeCast data={info} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ForeCast;
