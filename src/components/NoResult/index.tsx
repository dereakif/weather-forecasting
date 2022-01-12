import './styles.scss';

interface Props {
  isInvalid: boolean;
}

const NoResult = ({ isInvalid }: Props) => {
  return (
    <div className='no-result__container'>
      <h1 className={isInvalid ? 'no-result__container--invalid-red' : ''}>
        {isInvalid ? 'No city is selected!' : 'City doesn’t exist!'}
      </h1>
      <p>
        {isInvalid
          ? 'Type a valid city name to get weekly forecast data'
          : 'Type any city name to get weekly forecast data'}
      </p>
    </div>
  );
};

export default NoResult;
