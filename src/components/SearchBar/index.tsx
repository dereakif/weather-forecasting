import { SetStateAction } from 'react';
import './styles.scss';
interface Props {
  city: string;
  setCity: React.Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ city, setCity }: Props) => {
  return (
    <div className='search-bar'>
      <input
        placeholder='Search City'
        type='text'
        className='search-bar__input'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <svg
        className='search-bar__svg'
        width='28'
        height='29'
        viewBox='0 0 28 29'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M11.44 0.920013C5.425 0.920013 0.559998 5.78501 0.559998 11.8C0.559998 17.815 5.425 22.68 11.44 22.68C13.5875 22.68 15.575 22.05 17.26 20.98L25.12 28.84L27.84 26.12L20.08 18.38C21.475 16.55 22.32 14.2825 22.32 11.8C22.32 5.78501 17.455 0.920013 11.44 0.920013ZM11.44 3.48001C16.0475 3.48001 19.76 7.19251 19.76 11.8C19.76 16.4075 16.0475 20.12 11.44 20.12C6.8325 20.12 3.12 16.4075 3.12 11.8C3.12 7.19251 6.8325 3.48001 11.44 3.48001Z'
          fill='#77B6EA'
        />
      </svg>
    </div>
  );
};

export default SearchBar;
