import { useEffect, useState } from 'react';
import axios from 'axios';
import FilmItem from '../FilmItem/FilmItem';
import { Search } from '../Search/Search';
import loader from '../../assets/loader.svg';
import './style.css';

export interface FilmData {
  titleText: { text: string };
  primaryImage: { url: string };
  id: string;
  releaseYear: { year: number };
  genres: { ['genres']: { [0]: { text: string } } };
  ratingsSummary: { aggregateRating: number };
}
interface FetchedData {
  page: string | number;
}

const Cards: React.FC = () => {
  const [fetchedMovies, setFetchedMovies] = useState<Array<FilmData>>([]);
  const [fetchedData, setFetchedData] = useState<FetchedData>();
  const [page, setPage] = useState<Number>(1);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://moviesdatabase.p.rapidapi.com/titles',
      params: { list: 'top_rated_250', limit: '20', info: 'base_info', page: page },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    };

    const getData = async () => {
      try {
        const { data } = await axios.request(options);
        const { results } = data;
        setFetchedMovies(results);
        setFetchedData(data);
      } catch (error) {
        console.log('error', error);
      }
    };

    getData();
  }, [page]);

  if (!fetchedMovies || !fetchedData) {
    return <img className="testing" src={loader} alt="" />;
  }

  return (
    <div className="content">
      <Search />
      <h2>Top 250</h2>
      <div className="cards">{fetchedMovies && fetchedMovies.map((filmData) => <FilmItem key={filmData.id} {...filmData} />)}</div>
      <div className="pagination">
        <button
          className="pagination__arrow"
          onClick={() => setPage(fetchedData ? +fetchedData.page - 1 : 1)}
          disabled={+fetchedData.page <= 1 ? true : false}
        >
          {'<'}
        </button>
        <button className="pagination__page">{fetchedData.page}</button>
        <button
          className="pagination__arrow"
          onClick={() => setPage(fetchedData ? +fetchedData.page + 1 : 1)}
          disabled={fetchedData.page >= Math.ceil(250 / 20)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Cards;
