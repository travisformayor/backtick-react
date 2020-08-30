import React, { useEffect, useRef } from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../SearchBar/SearchBar';
import logo from './backtick-logo.png';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: 'white',
    padding: '15px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.12)',
    // Fixed Header
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: '1',
    // Flex Box
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: '4rem',
  },
  logoLink: {
    lineHeight: 0,
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));

export default function Header({ setSearchTerm, existingTerm, returnRef }) {
  // Header.js handles title bar and the search box
  const style = useStyles();
  const titleRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Send the refs up on component mount
    if (
      titleRef &&
      titleRef.current &&
      !titleRef.current.classList.contains('received')
    ) {
      returnRef(titleRef.current, 'title');
    }
    if (
      logoRef &&
      logoRef.current &&
      !logoRef.current.classList.contains('received')
    ) {
      returnRef(logoRef.current, 'logo');
    }
  }, [titleRef, logoRef, returnRef]);

  return (
    <div className={style.header}>
      <div className={style.title} ref={titleRef}>
        <Link href="/" color="textPrimary" underline="none">
          Backtick`
        </Link>
      </div>
      <div className={style.search}>
        <Link
          className={style.logoLink}
          href="/"
          color="textPrimary"
          underline="none"
        >
          <img src={logo} alt="Logo" ref={logoRef} />
        </Link>
        <SearchBar setSearchTerm={setSearchTerm} existingTerm={existingTerm} />
      </div>
    </div>
  );
}
