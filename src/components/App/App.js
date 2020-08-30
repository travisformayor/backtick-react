// to dos:
// - header displays total found
// - scroll lazy loads more results
// - hover over cards effect
// - gray out/indicate cards for already visited links
// - add link to cyrus blog post, backend, site readme/post
// animations:
// - header flex switch and shrink
// - cards fade/pop in staggered first to last
// - on new search, cards fade/pop first to last while waiting for backend
// - header black at first, title white with black shadow
// - once mini image loads, fade in blurry version
// - once full image loads, fade in over blurry version
// - can fade in be splotchy and non-uniform, like a watercolor effect
// - bouncing loading dots
// - fade in 'no more results' on attempts to scroll past end

import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { gsap } from 'gsap';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchClient from '../SearchClient/SearchClient';

export default function App() {
  // App.js handles top level code, like animations and url control
  const history = useHistory();
  const urlParams = useParams();

  // === GSAP Animations
  const headerTimeline = gsap.timeline({ paused: true });
  const refs = { cards: [], title: null, logo: null };

  function returnRef(ref, item) {
    if (ref) {
      switch (item) {
        case 'card':
          refs.cards.push(ref);
          break;
        case 'title':
          refs.title = ref;
          break;
        case 'logo':
          refs.logo = ref;
          break;
        default:
          console.log(`Unexpected ref: ${item}`);
      }
    }
  }

  useEffect(() => {
    // Animate populating cards
    console.log(refs.cards.length);
    if (refs.cards.length > 0) {
      console.log('=> run card animation');
      console.log(`Cards to animate: ${refs.cards.length}`);
      // card opacity is set to 0 in ResultCard.js
      gsap.fromTo(
        refs.cards,
        { y: 50 },
        { duration: 0.2, opacity: 1, y: 0, stagger: 0.05 }
      );
      refs.cards = []; // Remove refs for cards now loaded
    }
  }, [refs.cards]);

  useEffect(() => {
    // Set header animations with updated refs
    if (refs.logo && refs.title) {
      // Hide Title
      headerTimeline.fromTo(
        refs.title,
        { opacity: 1, height: '90px', display: 'block' },
        { opacity: 0, height: '0px', display: 'none', duration: 0.2 }
      );
      // Expand Logo
      headerTimeline.fromTo(
        refs.logo,
        { height: '0px', marginRight: '0px', opacity: 0 },
        { height: '40px', marginRight: '10px', opacity: 1, duration: 0.25 },
        '-=0.2'
      );
    }
  }, [headerTimeline, refs.logo, refs.title]);

  useEffect(() => {
    // Scroll listener for header animations
    window.addEventListener('scroll', resizeOnScroll);
    function resizeOnScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const resizeOn = 55;

      if (scrollY > resizeOn) {
        if (headerTimeline) headerTimeline.play();
      } else {
        if (headerTimeline) headerTimeline.reverse();
      }
    }
    // Remove event listener on component unmount
    return () => window.removeEventListener('scroll', resizeOnScroll);
  }, [headerTimeline]);

  return (
    <>
      <CssBaseline />
      <SearchClient
        urlParams={urlParams}
        history={history}
        returnRef={returnRef}
      />
    </>
  );
}
