import { useEffect, useState } from "react";
import styles from './index.css';
import { useHistory } from 'react-router-dom';

function MovieDetail(props) {
  const [film, setFilm] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const filmList = JSON.parse(localStorage.getItem('FILMLISTM'))
    console.log("props.match.params:", props.match.params)
    const { id } = props.match.params;
    console.log('filmList:', filmList)
    const index = filmList.findIndex((item)=>item.id == id)
    setFilm(filmList[index]);
    console.log("filmList[index]L", filmList[index])
  }, []);
 

  return (
    <>
      <h1 className="title"> Movies Now Playing </h1>
      <div className='detail'>
        <section className="item"> 
            <img className="img-size" src={'https://image.tmdb.org/t/p/w500/'+film.poster_path} alt=""/>
            <div className="film-title">{film.title}</div>
        </section>
      </div>
      
    </>
  );
}

export default MovieDetail;
