import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import ResultCard from '../ResultCard/ResultCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  results: {
    margin: '10px 10px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

export default function ResultsContainer({ searchData }) {
  // const { results, query, offset, total } = searchData;
  const { results, query } = searchData;
  const style = useStyles();

  let refCards = [];

  function addRef(ref) {
    refCards.push(ref);
    return ref; // returned for ResultCard
  }

  useEffect(() => {
    if (refCards.length > 0) {
      gsap.from(refCards, {
        duration: 0.2,
        opacity: 0,
        y: 100,
        stagger: 0.1,
      });
    }
  });

  return (
    <div className={style.results}>
      {results === null && query ? <p>No Results for {query}</p> : ''}
      {results
        ? results.map((result, index) => (
            <ResultCard
              result={result}
              addRef={addRef}
              key={'result-card-' + index}
            />
          ))
        : ''}
    </div>
  );
}
