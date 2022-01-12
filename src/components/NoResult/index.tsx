import './styles.scss';

interface Props {
  error: string | null;
}

const NoResult = ({ error }: Props) => {
  return (
    <div className='no-result__container'>
      <h1 className={error ? 'no-result__container--invalid-red' : ''}>
        {error ? 'No city is selected!' : 'City doesn’t exist!'}
      </h1>
      <p>
        {error
          ? 'Type a valid city name to get weekly forecast data'
          : 'Type any city name to get weekly forecast data'}
      </p>
    </div>
  );
};

export default NoResult;
