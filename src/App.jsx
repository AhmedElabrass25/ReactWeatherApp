import { useContext } from "react";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Main from "./components/Main";
import { WeatherContext } from "./context/WeatherContext";

const App = () => {
  const { loading } = useContext(WeatherContext);
  return (
    <>
      {loading && <Loading />}
      <Header />
      <Main />
    </>
  );
};

export default App;
