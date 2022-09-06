import { BrowserRouter, Route } from "react-router-dom";
import MovieContainer from "../components/movie/MovieContainer";
import MovieDetail from "../components/movie/MovieDetail";
function Routes() {
  return (
    <BrowserRouter>
      <Route path="/movies" component={MovieContainer} />
      <Route path="/film/:id" component={MovieDetail} />
    </BrowserRouter>
  );
}

export default Routes;
