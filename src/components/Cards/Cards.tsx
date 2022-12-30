import { useEffect, useState } from 'react';
import axios from 'axios';
import FilmItem from '../FilmItem/FilmItem';
import './style.css';

export type FilmData = {
  titleText: { text: string };
  primaryImage: { url: string };
  id: string;
  releaseYear: { year: number };
  genres: { ['genres']: { [0]: { text: string } } };
  ratingsSummary: { aggregateRating: number };
};

const options = {
  method: 'GET',
  url: 'https://moviesdatabase.p.rapidapi.com/titles',
  params: { list: 'top_rated_250', limit: '20', info: 'base_info' },
  headers: {
    'X-RapidAPI-Key': '4c30333a2cmshcabeec35a8eeaf0p105d82jsn803dee6778ac',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
  },
};

const Cards: React.FC = () => {
  const [fetchedMovies, setFetchedMovies] = useState<Array<FilmData>>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.request(options);
      const { results } = data;
      setFetchedMovies(results);
    };

    getData();
  }, []);

  return (
    <div className="content">
      <h2>Top 250</h2>
      <div className="cards">{fetchedMovies && fetchedMovies.map((filmData) => <FilmItem key={filmData.id} {...filmData} />)}</div>
    </div>
  );
};

export default Cards;
