import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import './style.css';
import oscar from '../../assets/oscar.webp';
import user from '../../assets/user_not_found.jpeg';
import convertSecondsToMinutes from '../../utils/convertSecondsToMinutes';
import numberWithSpaces from '../../utils/numberWithSpaces';
import star from '../../assets/star.svg';
import loader from '../../assets/loader.svg';
import { store } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../redux/favoriteSlice';

interface BaseInfo {
  plot: { plotText: { plainText: string } };
  titleText: { text: string };
  releaseYear: { year: string | number };
  ratingsSummary: { aggregateRating: number; voteCount: number };
  primaryImage: { url: string };
  runtime: any;
  genres: {
    genres: [
      {
        text: string;
        id: string | number;
      }
    ];
  };
}

interface AwardsInfo {
  nominations: { total: string | number };
  wins: { total: string | number };
  prestigiousAwardSummary?: { award: { text: string }; wins: string | number };
}

interface CrewInfo {
  directors: [{ credits: [{ name: [{ nameText: string }] }] }];
  writers: [{ credits: [{ name: [{ nameText: string }] }] }];
}

interface CastInfo {
  node: { name: { nameText: string } };
}

const FullMovie: React.FC = () => {
  const [movieBaseInfo, setMovieBaseInfo] = useState<BaseInfo>();
  const [movieCastInfo, setMovieCastInfo] = useState<Array<CastInfo>>([]);
  const [movieCrewInfo, setMovieCrewInfo] = useState<CrewInfo>();
  const [movieAwardsInfo, setMovieAwardsInfo] = useState<AwardsInfo>();
  const [color, setColor] = useState('none');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFavorite = useCallback(() => {
    if (store.getState().favorite.filter((val) => val === id).length === 1) setColor('#FFD700');
  }, [id]);

  useEffect(() => {
    const baseInfoOptions = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
      params: { info: 'base_info' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    };

    const castInfoOptions = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
      params: { info: 'extendedCast' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    };

    const crewInfoOptions = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
      params: { info: 'creators_directors_writers' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    };

    const awardsInfoOptions = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
      params: { info: 'awards' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    };

    const getBaseData = async () => {
      try {
        const { data } = await axios.request(baseInfoOptions);
        setMovieBaseInfo(data.results);
      } catch (error) {
        navigate('/');
        alert('Фильм не найден :(');
      }
    };

    const getCastData = async () => {
      try {
        const { data } = await axios.request(castInfoOptions);
        setMovieCastInfo(data.results.cast.edges);
      } catch (error) {
        navigate('/');
        alert('Фильм не найден :(');
      }
    };

    const getCrewData = async () => {
      try {
        const { data } = await axios.request(crewInfoOptions);
        setMovieCrewInfo(data.results);
      } catch (error) {
        navigate('/');
        alert('Фильм не найден :(');
      }
    };

    const getAwardsData = async () => {
      try {
        const { data } = await axios.request(awardsInfoOptions);
        setMovieAwardsInfo(data.results);
      } catch (error) {
        navigate('/');
        alert('Фильм не найден :(');
      }
    };

    getBaseData();
    getCastData();
    getCrewData();
    getAwardsData();
    handleFavorite();
  }, [navigate, id, handleFavorite]);

  if (!movieBaseInfo || !movieCastInfo || !movieCrewInfo || !movieAwardsInfo) {
    return (
      <>
        <img className="testing" src={loader} alt="" />
      </>
    );
  }

  const { plot, titleText, releaseYear, ratingsSummary, primaryImage, runtime, genres } = movieBaseInfo;
  const { nominations, wins, prestigiousAwardSummary } = movieAwardsInfo;

  const clickBookmarks = () => {
    if (color === 'none') {
      setColor('#FFD700');
      dispatch(addFavorite(id));
    }
    if (color !== 'none') {
      setColor('none');
      dispatch(deleteFavorite(id));
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        {primaryImage ? (
          <div
            className="movie__img"
            style={{
              backgroundImage: `url(${primaryImage.url})`,
            }}
          ></div>
        ) : (
          <div className="movie__img"></div>
        )}
        <button className="favorite__btn" onClick={clickBookmarks}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 16 16"
            version="1.1"
            fill={store.getState().favorite.filter((val) => val === id).length === 1 ? '#FFD700' : 'none'}
            stroke="#FFD700"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <polygon points="3.75 1.75,12.25 1.75,12.25 14.25,8 9.75,3.75 14.25"></polygon>
          </svg>
          Add to favorites
        </button>
        <ul className="genres">
          {genres &&
            genres.genres.map((genre) => {
              return (
                <li className="genre" key={genre.id}>
                  {genre.text}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="movie">
        <div className="movie__header">
          <h1 className="title">
            {titleText.text} ({releaseYear?.year})
          </h1>
          {runtime && <span className="time">{convertSecondsToMinutes(runtime.seconds)}</span>}
        </div>
        <div className="movie__main">
          {plot && (
            <div className="plot">
              <h4>Plot</h4>
              <p className="plot__text">{plot.plotText?.plainText}</p>
            </div>
          )}
          <div className="director">
            <h4>Director</h4>
            <ul className="director__list">
              {movieCrewInfo.directors &&
                movieCrewInfo.directors.map((crewData: any) => {
                  return (
                    <li className="director__name" key={crewData.credits[0]?.name.id}>
                      {crewData.credits[0]?.name.nameText.text}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="writers">
            <h4>Writers</h4>
            <ul className="writers__list">
              {movieCrewInfo.writers[0] &&
                movieCrewInfo.writers[0].credits.map((crewData: any) => {
                  return (
                    <li className="writers__name" key={crewData.name.id}>
                      {crewData.name.nameText.text}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="cast">
            <h4>Cast</h4>
            <ul className="cast__list">
              {movieCastInfo &&
                movieCastInfo.map(({ node }: any) => {
                  return (
                    <li className="cast__actor" key={node.name.id}>
                      <div
                        className="cast__actor__img"
                        style={{
                          backgroundImage: `url(${node.name.primaryImage ? node.name.primaryImage.url : `${user}`})`,
                        }}
                      ></div>
                      <p className="cast__actor__name">
                        {node.name.nameText.text} <br />
                        {node.characters && <span className="cast__actor__role">{node.characters[0].name}</span>}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div className="right-side">
        {ratingsSummary.aggregateRating && (
          <div className="movie__rating">
            <span className="movie__rating__points">
              <span className="movie__rating__points--big">
                <img src={star} alt="star" />
                {ratingsSummary.aggregateRating}
              </span>
              /10
            </span>
            <span className="movie__rating__ratings">{numberWithSpaces(ratingsSummary.voteCount)} ratings</span>
          </div>
        )}
        <div className="movie__awards">
          <h4>Awards</h4>
          <div className="movie__awards__cards">
            {wins.total && (
              <div className="movie__awards__card">
                <span>Wins</span>
                <span className="movie__awards__card__count">
                  <b>{wins.total}</b>
                </span>
              </div>
            )}
            {nominations.total && (
              <div className="movie__awards__card">
                <span>Nominations</span>
                <span className="movie__awards__card__count">
                  <b>{nominations.total}</b>
                </span>
              </div>
            )}

            {prestigiousAwardSummary?.award && prestigiousAwardSummary.wins > 0 && (
              <div className="movie__awards__card movie__awards__card--oscar">
                <img src={oscar} alt="" width={120} height={120} />
                <span className="movie__awards__card__count">
                  <b>{prestigiousAwardSummary.wins}</b>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMovie;
