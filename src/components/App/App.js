// to dos:
// scroll switches to mini-header for easy followup searches
// header displays total found
// scroll lazy loads more results

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import axios from 'axios';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const history = useHistory();
  const urlParams = useParams();

  useEffect(() => {
    // Existing URL Params term. Save to term state
    if (urlParams && urlParams.search) {
      setSearchTerm(urlParams.search);
    }
  }, [urlParams]);

  useEffect(() => {
    if (searchTerm) {
      history.push(`/search=${searchTerm}`);

      fetchResults(searchTerm);
      async function fetchResults(searchTerm) {
        // Fetch results from the backend
        const endpoint = 'https://backtick.tilde.wtf';
        const res = await axios(`${endpoint}/search?q=${searchTerm}`);
        const data = await res.data;
        setSearchData(data);
      }
    } else {
      history.push('/');
      // No search term. Set Blank
      const blank = {
        'results': null,
        'query': null,
        'offset': 0,
        'total': 0,
      };
      setSearchData(blank);
    }
  }, [searchTerm, history]);

  return (
    <>
      <CssBaseline />
      <Header setSearchTerm={setSearchTerm} existingTerm={searchTerm} />
      <ResultsContainer searchData={searchData} />
    </>
  );
}
