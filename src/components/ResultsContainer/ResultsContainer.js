import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import ResultCard from '../ResultCard/ResultCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  results: {
    paddingTop: '160px',
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

  let cardRefs = [];

  function returnRef(ref) {
    // Returns the child ref back to this component
    cardRefs.push(ref);
    return ref; // this is for ResultCard
  }

  useEffect(() => {
    if (cardRefs.length > 0) {
      gsap.fromTo(
        cardRefs,
        { y: 100 },
        {
          duration: 0.2,
          opacity: 1, // opacity 0 set in ResultCard
          y: 0,
          stagger: 0.1,
        }
      );
    }
  });

  return (
    <div className={style.results}>
      {results === null && query ? <p>No Results for {query}</p> : ''}
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
  );
}
