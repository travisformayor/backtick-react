// to dos:
// - header shows displaying out of total found
// - hover over cards effect
// - gray out/indicate cards for already visited links
// - add link to cyrus blog post, backend, site readme/post
// - add end of truncated urls back on after the ...
// - scroll lazy loads more results
// - trigger load more on scroll before reaching the bottom
// animations:
// - bouncing loading dots
// - fade in 'no more results' on attempts to scroll past end
// - header black at first, title white with black shadow
// - once mini image loads, fade in blurry version
// - once full image loads, fade in over blurry version
// - fade in splotchy and non-uniform

import React, { useEffect, useState } from 'react';
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
  const refs = { title: null, logo: null };
  const [cards, setCards] = useState([]);

  function returnRef(ref, item) {
    if (ref) {
      switch (item) {
        case 'card':
          setCards(cards => [...cards, ref]);
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
    console.log("Entering useEffect for cards", cards.length);
    if (cards.length > 0) {
      console.log('=> run card animation');
      console.log(`Cards to animate: ${cards.length}`);
      // card opacity is set to 0 in ResultCard.js
      gsap.fromTo(
        cards.map(card => {
          card.classList.add('animated');
          return card;
        }),
        { y: 50 },
        { duration: 0.2, opacity: 1, y: 0, stagger: 0.05 }
      );
      setCards(() => []); // Remove refs for cards now loaded
    }
  }, [cards]);

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
