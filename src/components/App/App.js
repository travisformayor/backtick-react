// to dos:
// - hover over cards effect
// - gray out/indicate cards for already visited links
// - add end of truncated urls back on after the ...
// - update readme. add to tildeverse blog
// - info footer: blog post, github
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
  const [cardRefs, setCardRefs] = useState([]);
  const [titleRef, setTitleRef] = useState(null);
  const [logoRef, setLogoRef] = useState(null);
  const [headerTimeline, setHeaderTimeline] = useState(null);
  const history = useHistory();
  const urlParams = useParams();

  // === GSAP Animations
  function returnRef(ref, item) {
    if (ref) {
      switch (item) {
        case 'title':
          setTitleRef(ref);
          break;
        case 'logo':
          setLogoRef(ref);
          break;
        case 'card':
          setCardRefs((cards) => [...cards, ref]);
          break;
        default:
          console.log(`Unexpected ref: ${item}`);
      }
    }
  }

  // == Header
  useEffect(() => {
    // Mark received title & logo refs, init timeline
    if (titleRef && logoRef) {
      logoRef.classList.add('received');
      titleRef.classList.add('received');
      setHeaderTimeline(gsap.timeline({ paused: true }));
    }
  }, [titleRef, logoRef]);

  useEffect(() => {
    // Add header animations to timeline
    if (headerTimeline && titleRef && logoRef) {
      console.log('Add header animation');
      // Hiding/Showing Title
      headerTimeline.fromTo(
        titleRef,
        { opacity: 1, height: '90px', display: 'block' },
        { opacity: 0, height: '0px', display: 'none', duration: 0.2 }
      );
      // Expanding/Shrinking Logo
      headerTimeline.fromTo(
        logoRef,
        { height: '0px', marginRight: '0px', opacity: 0 },
        { height: '40px', marginRight: '10px', opacity: 1, duration: 0.25 },
        '-=0.2'
      );
    }
  }, [headerTimeline, titleRef, logoRef]);

  useEffect(() => {
    // Scroll listener for header animations
    if (headerTimeline) {
      console.log('add header scroll listener');
      console.log(headerTimeline);
      window.addEventListener('scroll', resizeOnScroll);
      function resizeOnScroll() {
        const scrollY =
          window.pageYOffset || document.documentElement.scrollTop;
        const resizeOn = 55;

        if (scrollY > resizeOn) {
          if (headerTimeline) headerTimeline.play();
        } else {
          if (headerTimeline) headerTimeline.reverse();
        }
      }
      // Remove event listener on component unmount
      return () => window.removeEventListener('scroll', resizeOnScroll);
    }
  }, [headerTimeline]);

  // == Result Cards
  useEffect(() => {
    // Animate cards on populate
    if (cardRefs.length > 0) {
      // console.log('run card animation');
      // Note: card opacity is set to 0 in ResultCard.js
      gsap.fromTo(
        cardRefs.map((card) => {
          card.classList.add('animated');
          return card;
        }),
        { y: 50 },
        { duration: 0.2, opacity: 1, y: 0, stagger: 0.05 }
      );
      setCardRefs(() => []); // Remove refs for cards now loaded
    }
  }, [cardRefs]);

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
