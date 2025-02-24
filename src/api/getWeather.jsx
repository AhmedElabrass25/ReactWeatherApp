import axios from "axios";
// const API_KEY = import.meta.env.VITE_API_KEY;
export async function getWeather(endPoint, place_id, measurment) {
  const options = {
    method: "GET",
    url: `https://ai-weather-by-meteosource.p.rapidapi.com/${endPoint}`,
    params: {
      place_id,
      timezone: "auto",
      language: "en",
      units: measurment,
    },
    headers: {
      "x-rapidapi-key": "2b61040f8amsh3e8520da0d25b24p18d87ejsn241479531cbe",
      "x-rapidapi-host": "ai-weather-by-meteosource.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// >>>>>>>>>>>>>>>>>>>find place
export async function findPlaceFunc(text) {
  const options = {
    method: "GET",
    url: "https://ai-weather-by-meteosource.p.rapidapi.com/find_places",
    params: {
      text,
      language: "en",
    },
    headers: {
      "x-rapidapi-key": "2b61040f8amsh3e8520da0d25b24p18d87ejsn241479531cbe",
      "x-rapidapi-host": "ai-weather-by-meteosource.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
