import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
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

export default function Header({ setSearchTerm, existingTerm }) {
  const style = useStyles();

  const tl = gsap.timeline({ paused: true });
  let headerRef = useRef(null);
  let titleRef = useRef(null);
  let logoRef = useRef(null);
  let searchBoxRef = useRef(null);

  useEffect(() => {
    // == Animate using mounted refs
    // Remove Title
    tl.fromTo(
      titleRef.current,
      { opacity: 1, height: '90px' },
      { opacity: 0, height: '0px', display: 'none', duration: 0.2 }
    );
    // Expand Logo
    tl.fromTo(
      logoRef.current,
      { height: '0px', marginRight: '0px', opacity: 0 },
      { height: '40px', marginRight: '10px', opacity: 1, duration: 0.25 },
      '-=0.2'
    );
  }, [tl]);

  useEffect(() => {
    // Animate header change on scroll
    window.addEventListener('scroll', resizeOnScroll);
    function resizeOnScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const resizeOn = 55;

      if (scrollY > resizeOn) {
        if (tl) tl.play();
      } else {
        if (tl) tl.reverse();
      }
    }

    // Remove event listener on component unmount
    return () => window.removeEventListener('scroll', resizeOnScroll);
  }, [tl]);

  return (
    <div className={style.header} ref={headerRef}>
      <div className={style.title} ref={titleRef}>
        <Link href="/" color="textPrimary" underline="none">
          Backtick`
        </Link>
      </div>
      <div className={style.search} ref={searchBoxRef}>
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
      {/* to do: add a 'displaying 30 of 130 results' line */}
    </div>
  );
}
