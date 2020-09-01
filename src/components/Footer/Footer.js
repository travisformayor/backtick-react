import React from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#262626',
    boxShadow: '0px -4px 3px rgba(0,0,0,0.3)',
    padding: '10px',
    paddingBottom: '25px',
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
  info: {
    padding: '15px',
    height: '.8rem',
    fontSize: '.8rem',
  },
}));

export default function Footer() {
  // Footer.js contains the page information footer
  const style = useStyles();

  return (
    <div className={style.footer}>
      <div className={style.info}>
        <Link
          color="textPrimary"
          underline="none"
          href="https://tilde.wtf/~cyrus/blog/announcing-search-for-the-tildeverse.html"
          target="_blank"
          rel="noopener"
        >
          Blog Post - Search the Tildeverse
        </Link>
      </div>
      <div className={style.info}>
        <Link
          color="textPrimary"
          underline="none"
          href="https://github.com/travisformayor/backtick-react"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </Link>
      </div>
    </div>
  );
}
