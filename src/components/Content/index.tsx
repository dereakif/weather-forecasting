import { useFetchWeatherByCity } from '../../hooks/useFetchForecastByCity';
import Loading from '../Loading';
import NoResult from '../NoResult';
import Result from '../Result';
import SearchBar from '../SearchBar';
import './styles.scss';

const Content = () => {
  const { response, error, loading, city, setCity } = useFetchWeatherByCity();

  return (
    <div className='content'>
      <SearchBar city={city} setCity={setCity} />
      <div className='content__body'>
        {loading ? (
          <Loading />
        ) : response ? (
          <Result response={response} />
        ) : (
          <NoResult error={error} />
        )}
      </div>
    </div>
  );
};

export default Content;
