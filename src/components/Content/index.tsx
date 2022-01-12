import { useFetchWeatherByCityV2 } from '../../hooks/useFetchForecastByCity';
import Loading from '../Loading';
import NoResult from '../NoResult';
import Result from '../Result';
import SearchBar from '../SearchBar';
import './styles.scss';

const Content = () => {
  const { loading, response } = useFetchWeatherByCityV2('NY');
  const isInvalid = true;
  return (
    <div className='content'>
      <SearchBar />
      <div className='content__body'>
        {loading ? (
          <Loading />
        ) : response ? (
          <Result />
        ) : (
          <NoResult isInvalid={isInvalid} />
        )}
      </div>
    </div>
  );
};

export default Content;
