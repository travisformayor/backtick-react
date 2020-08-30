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

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { gsap } from 'gsap';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import axios from 'axios';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultData, setResultData] = useState({ results: [] });
  const [loading, setLoading] = useState(false);
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
    if (refs.cards.length > 0) {
      console.log('=> run card animation');
      // card opacity is set to 0 in ResultCard.js
      gsap.fromTo(
        refs.cards,
        { y: 50 },
        { duration: 0.2, opacity: 1, y: 0, stagger: 0.05 }
      );
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
  });

  // === API Functions
  async function endpointCallout(term, offset = 0) {
    // Fetch Results
    setLoading(true);
    console.log(`Callout for term: ${term}`);
    const endpoint = 'https://backtick.tilde.wtf';
    const params = `search?q=${term}&offset=${offset}`;
    console.log(`${endpoint}/${params}`);
    const res = await axios(`${endpoint}/${params}`);
    console.log('api response:');
    console.log(res.data);
    setLoading(false);
    return res.data;
  }

  async function fetchMore(newOffset) {
    const updateCriteria =
      newOffset &&
      newOffset > 0 && // Not the first offset
      newOffset === resultData.results.length && // maxed out the current offset
      resultData.results.length % 30 === 0 && // current results is a multiple of 30
      !loading; // Not already performing a callout

    if (updateCriteria) {
      console.log('Valid offset request. Fetching more...');

      const data = await endpointCallout(searchTerm, newOffset);
      setResultData({
        results:
          data.results && data.results.length > 0
            ? [...resultData.results, ...data.results]
            : resultData.results,
        query: data.query ? data.query : null,
        offset: data.offset ? parseInt(data.offset) : 0,
        total: data.total ? parseInt(data.total) : 0,
      });
    } else {
      console.log('Failed requirements for fetchMore');
    }
  }

  useEffect(() => {
    console.log(`Loading State: ${loading}`);
  }, [loading]);

  useEffect(() => {
    // == Handle url containing a search term
    if (urlParams && urlParams.search) {
      setSearchTerm(urlParams.search);
    }
  }, [urlParams]);

  useEffect(() => {
    // == Handle changed/new search term from url or prop callback
    if (searchTerm) {
      console.log(`New search term detected: ${searchTerm}`);
      history.push(`/search=${searchTerm}`);

      setResultData({ results: [] }); // Clear previous search results

      fetchResults();
      async function fetchResults() {
        const data = await endpointCallout(searchTerm);
        setResultData({
          results: data.results && data.results.length > 0 ? data.results : [],
          query: data.query ? data.query : null,
          offset: data.offset ? parseInt(data.offset) : 0,
          total: data.total ? parseInt(data.total) : 0,
        });
      }
    } else {
      // searchTerm was changed to null
      console.log(`Blank search`);
      history.push('/');

      setResultData({ results: [] }); // Clear previous search results
    }
  }, [searchTerm, history]);

  return (
    <>
      <CssBaseline />
      <Header
        setSearchTerm={setSearchTerm}
        existingTerm={searchTerm}
        returnRef={returnRef}
      />
      <ResultsContainer
        resultData={resultData}
        returnRef={returnRef}
        fetchMore={fetchMore}
        loading={loading}
      />
    </>
  );
}
