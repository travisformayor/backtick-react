import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: { zIndex: 2 },
  content: {
    flex: '1 0 auto',
    paddingBottom: '40px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.12)',
    zIndex: 1,
  },
  footer: { flexShrink: '0' },
}));

export default function SearchClient({ urlParams, history, returnRef }) {
  // Search.js handles search, endpoint access, and displaying results
  const [searchTerm, setSearchTerm] = useState(urlParams.search);
  const [resultData, setResultData] = useState({ results: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const style = useStyles();

  // === Callout Functions
  async function endpointCallout(term, offset = 0) {
    // Fetch Results
    setLoading(true);
    // console.log(`Callout for term: ${term}`);
    const endpoint = 'https://backtick.tilde.wtf';
    const params = `search?q=${term}&offset=${offset}`;
    // console.log(`${endpoint}/${params}`);
    const res = await axios(`${endpoint}/${params}`);
    // console.log('api response:');
    // console.log(res.data);
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
      // console.log('Valid offset request. Fetching more...');
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
      // console.log('Failed requirements for fetchMore');
    }
  }

  useEffect(() => {
    // == Handle new search term
    if (searchTerm) {
      // console.log(`New search term detected: ${searchTerm}`);
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
      // console.log(`Blank search`);
      history.push('/');

      setResultData({ results: [] }); // Clear previous search results
    }
  }, [searchTerm, history]);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <Header
          setSearchTerm={setSearchTerm}
          existingTerm={searchTerm}
          returnRef={returnRef}
          current={resultData.results.length}
          total={resultData.total}
        />
      </div>
      <div className={style.content}>
        <ResultsContainer
          resultData={resultData}
          returnRef={returnRef}
          fetchMore={fetchMore}
          loading={loading}
        />
      </div>
      <div className={style.footer}>
        <Footer />
      </div>
    </div>
  );
}
