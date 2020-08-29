import React, { useEffect } from 'react';
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

export default function ResultsContainer({ resultData, setOffset, loading }) {
  // to do: use loading for triggering bouncing ball animation
  // const { results, query, offset, total } = searchData;
  const { results, query, offset, total } = resultData;
  const style = useStyles();
  let cardRefs = [];

  function returnRef(ref) {
    // Returns the child ref back to this component
    cardRefs.push(ref);
    return ref; // this is for ResultCard
  }

  useEffect(() => {
    // Animate populating cards

    // to do: if the card's opacity is already 1, skip/remove it from refs array
    if (cardRefs.length > 0) {
      // card opacity set to 0 in ResultCard.js
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
          if (offset + 30 !== results.length) {
            console.log('Unexpected number of results');
            console.log(offset);
            console.log(results);
          } else {
            console.log('Set new offset');
            setOffset(offset + 30);
          }
        } else {
          console.log('No more results');
        }
      }
    }

    // Remove event listener on component unmount
    return () => window.removeEventListener('scroll', bottomScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultData]);

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
