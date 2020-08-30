import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import axios from 'axios';

export default function SearchClient({ urlParams, history, returnRef }) {
  // Search.js handles search, endpoint access, and displaying results
  const [searchTerm, setSearchTerm] = useState(urlParams.search);
  const [resultData, setResultData] = useState({ results: [] });
  const [loading, setLoading] = useState(false);

  // === Callout Functions
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

      setResultData((resultData) => ({
        results:
          data.results && data.results.length > 0
            ? [...resultData.results, ...data.results]
            : [...resultData.results],
        query: data.query ? data.query : null,
        offset: data.offset ? parseInt(data.offset) : 0,
        total: data.total ? parseInt(data.total) : 0,
      }));
    } else {
      console.log('Failed requirements for fetchMore');
    }
  }

  useEffect(() => {
    console.log(`Loading State: ${loading}`);
  }, [loading]);

  useEffect(() => {
    // == Handle new search term
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
