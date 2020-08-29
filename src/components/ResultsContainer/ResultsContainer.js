import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import ResultCard from '../ResultCard/ResultCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  results: {
    paddingTop: '180px',
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
  loader: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function ResultsContainer(props) {
  const { resultData, fetchMore, loading } = props;
  // to do: use loading for triggering bouncing ball animation
  // const { results, query, offset, total } = searchData;
  const { results, query, offset, total } = resultData;
  const [fetching, setFetchMore] = useState(false);
  const style = useStyles();

  // === Card Refs
  let cardRefs = [];
  function returnRef(ref) {
    // Returns the child ref back to this component
    if (ref) {
      cardRefs.push(ref);
      // console.log(ref);
      return ref; // returned for ResultCard
    }
  }

  useEffect(() => {
    // Animate populating cards
    if (cardRefs.length > 0) {
      console.log('=> run animation');
      // card opacity is set to 0 in ResultCard.js
      gsap.fromTo(
        cardRefs,
        { y: 50 },
        { duration: 0.2, opacity: 1, y: 0, stagger: 0.05 }
      );
    }
  }, [cardRefs]);

  useEffect(() => {
    // Load more cards on scroll
    // to do: trigger before reaching the bottom
    window.addEventListener('scroll', bottomScroll);
    function bottomScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
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
      console.log('Request more results...');
      setFetchMore(false);
      fetchMore(offset + 30);
    }
  }, [fetching, fetchMore, offset]);

  return (
    <>
      <div className={style.results}>
        {results === [] && query ? <p>No Results for {query}</p> : ''}
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
      <div className={style.loader}>
        {loading ? <span>loading...</span> : <span></span>}
      </div>
    </>
  );
}
