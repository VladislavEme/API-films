import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, store } from '../../redux/store';
import { FilmData } from '../Cards/Cards';
import poster404 from '../../assets/poster404.png';

const Favorites: React.FC = () => {
  const [fetchFavoriteFilms, setFetchFavoriteFilms] = useState<Array<FilmData>>([]);
  const favorites = useSelector((state: RootState) => state.favorite);

  useEffect(() => {
    const getData = async () => {
      try {
        await Promise.all(
          favorites.map(async (id) => {
            const options = {
              method: 'GET',
              url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
              params: { info: 'base_info' },
              headers: {
                'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
              },
            };
            const { data } = await axios.request(options);
            setFetchFavoriteFilms((prevState: FilmData[]) => [...prevState, data.results]);
          })
        );
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, [favorites]);

  return (
    <div className="content">
      <h2>My favorites</h2>
      {fetchFavoriteFilms && fetchFavoriteFilms.length > 0 ? (
        <div className="cards">
          {fetchFavoriteFilms.map(({ titleText, primaryImage, id, releaseYear, genres, ratingsSummary }: FilmData) => (
            <div className="card" key={id}>
              {
                <Link to={`/movie/${id}`}>
                  <div
                    className="card__img"
                    style={{
                      backgroundImage: `url(${primaryImage?.url ? primaryImage.url : poster404})`,
                    }}
                  ></div>
                </Link>
              }
              <h3 className="card__title">{titleText.text}</h3>
              <span>
                {releaseYear ? releaseYear?.year : 'Year unknown'}, {genres ? genres.genres[0]?.text : 'Genres unknow'}
              </span>

              {ratingsSummary.aggregateRating && (
                <div className="rate">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      height="12px"
                      viewBox="0 0 128 128"
                      aria-hidden="true"
                      role="img"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M68.05 7.23l13.46 30.7a7.047 7.047 0 0 0 5.82 4.19l32.79 2.94c3.71.54 5.19 5.09 2.5 7.71l-24.7 20.75c-2 1.68-2.91 4.32-2.36 6.87l7.18 33.61c.63 3.69-3.24 6.51-6.56 4.76L67.56 102a7.033 7.033 0 0 0-7.12 0l-28.62 16.75c-3.31 1.74-7.19-1.07-6.56-4.76l7.18-33.61c.54-2.55-.36-5.19-2.36-6.87L5.37 52.78c-2.68-2.61-1.2-7.17 2.5-7.71l32.79-2.94a7.047 7.047 0 0 0 5.82-4.19l13.46-30.7c1.67-3.36 6.45-3.36 8.11-.01z"
                        fill="#fdd835"
                      />
                      <path
                        d="M67.07 39.77l-2.28-22.62c-.09-1.26-.35-3.42 1.67-3.42c1.6 0 2.47 3.33 2.47 3.33l6.84 18.16c2.58 6.91 1.52 9.28-.97 10.68c-2.86 1.6-7.08.35-7.73-6.13z"
                        fill="#ffff8d"
                      />
                      <path
                        d="M95.28 71.51L114.9 56.2c.97-.81 2.72-2.1 1.32-3.57c-1.11-1.16-4.11.51-4.11.51l-17.17 6.71c-5.12 1.77-8.52 4.39-8.82 7.69c-.39 4.4 3.56 7.79 9.16 3.97z"
                        fill="#f4b400"
                      />
                    </svg>
                    {ratingsSummary.aggregateRating}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>{'You have not favorites yet 😢'}</p>
      )}
    </div>
  );
};

export default Favorites;
