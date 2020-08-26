import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../SearchBar/SearchBar';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontSize: '4rem',
    margin: '10px',
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

export default function Header({ fetchResults }) {
  const style = useStyles();

  return (
    <>
      <p className={style.title}>Backtick`</p>
      <div className={style.search}>
        <SearchBar fetchResults={fetchResults} />
      </div>
    </>
  );
}
