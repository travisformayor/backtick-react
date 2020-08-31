import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ResultCard from '../ResultCard/ResultCard';
import LoadingDots from '../LoadingDots/LoadingDots';

const useStyles = makeStyles((theme) => ({
  results: {
    paddingTop: '200px',
    marginRight: '10px',
    marginLeft: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, max-content))',
    gridGap: '15px',
    justifyContent: 'center',
  },
  card: {
    opacity: 0,
  },
  info: {
    paddingTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    padding: '5px',
    height: '1rem',
    fontSize: '1rem',
    color: '#1b1b1b',
  },
}));

export default function ResultsContainer(props) {
  // ResultsContainer.js handles displaying the result cards
  const { resultData, returnRef, fetchMore, loading } = props;
  const { results, query, offset, total } = resultData;
  const [fetching, setFetchMore] = useState(false);
  const style = useStyles();

  useEffect(() => {
    // Load more cards on scroll
    window.addEventListener('scroll', bottomScroll);
    function bottomScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight * 0.7
      ) {
        if (results.length < total) {
          if (!loading) {
            setFetchMore(true);
          } else {
            console.log('Still loading results...');
          }
        } else {
          console.log('No more results');
        }
      }
    }

    // Remove event listener on component unmount
    return () => window.removeEventListener('scroll', bottomScroll);
  });

  useEffect(() => {
    if (fetching) {
      // console.log('Request more results...');
      setFetchMore(false);
      fetchMore(offset + 30);
    }
  }, [fetching, fetchMore, offset]);

  return (
    <>
      <div className={style.results}>
        {results
          ? results.map((result, index) => (
              <ResultCard
                result={result}
                returnRef={returnRef}
                key={'result-card-' + index}
              />
            ))
          : ''}
      </div>
      <div className={style.info}>
        <span>
          {results.length === 0 && query ? `No Results for ${query}` : ''}
        </span>
        {loading ? <LoadingDots /> : <div />}
      </div>
    </>
  );
}
