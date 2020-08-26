import React from 'react';
import { Link } from '@material-ui/core';
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

export default function Header({ setSearchTerm, existingTerm }) {
  const style = useStyles();

  return (
    <>
      <div className={style.title}>
        <Link href="/" color="textPrimary" underline="none">
          Backtick`
        </Link>
      </div>
      <div className={style.search}>
        <SearchBar setSearchTerm={setSearchTerm} existingTerm={existingTerm} />
      </div>
    </>
  );
}
