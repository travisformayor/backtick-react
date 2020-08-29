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

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import axios from 'axios';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultData, setResultData] = useState({ results: [] });
  const [newOffset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const urlParams = useParams();

  // === API Functions
  async function endpointCallout(term, offset = 0) {
    // Fetch Results
    setLoading(true);
    console.log(`Perform Search: ${term}`);
    const endpoint = 'https://backtick.tilde.wtf';
    const params = `search?q=${term}&offset=${offset}`;
    console.log(`${endpoint}/${params}`);
    const res = await axios(`${endpoint}/${params}`);
    console.log('api response:');
    console.log(res.data);
    setLoading(false);
    return res.data;
  }

  async function fetchMore() {
    console.log('Current Loading: ' + loading);
    console.log(searchTerm);
    if (!loading) {
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
      console.log('already loading more...');
    }
  }

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

  useEffect(() => {
    // == Handle more results for the same search term
    const updateCriteria =
      newOffset &&
      newOffset > 0 && // Not the first offset
      newOffset === resultData.results.length && // maxed out the current offset
      resultData.results.length % 30 === 0 && // current results is a multiple of 30
      resultData.results.length < resultData.total; // more results available

    if (updateCriteria) {
      console.log('New valid offset. Fetching more...');
      fetchMore();
    }
    // https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  }, [newOffset]);

  return (
    <>
      <CssBaseline />
      <Header setSearchTerm={setSearchTerm} existingTerm={searchTerm} />
      <ResultsContainer
        resultData={resultData}
        setOffset={setOffset}
        loading={loading}
      />
    </>
  );
}
