import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const getImages = async (query, page = 1) => {
  const response = await axios.get(
    `/search/photos/?query=${query}&client_id=D7OsxnssasWe0z-2okrW707G8Rh_4naTGd8yluU1eds&per_page=8&page=${page}`
  );
  return response;
};
