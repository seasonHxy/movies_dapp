import axios from "axios";

const API_URL =
"https://api.themoviedb.org/3/movie/now_playing?api_key=fd916fef0f3f297f0eb2b67eee1f47a3&language=en-US&page=1"
const dataService = {
  get: () => axios.get(API_URL)
};

export default dataService;
