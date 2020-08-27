// to dos:
// - header displays total found
// - scroll lazy loads more results
// - hover over cards effect
// - gray out/indicate cards for already visited links
// animations:
// - header flex switch and shrink
// - cards fade/pop in staggered first to last
// - on new search, cards fade/pop first to last while waiting for backend
// - header black at first, title white with black shadow
// - once mini image loads, fade in blurry version
// - once full image loads, fade in over blurry version
// - can fade in be splotchy and non-uniform, like a watercolor effect

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
    const blank = {
      'results': null,
      'query': null,
      'offset': 0,
      'total': 0,
    };

    if (searchTerm) {
      history.push(`/search=${searchTerm}`);

      fetchResults(searchTerm);
      async function fetchResults(searchTerm) {
        // Fetch results from the backend
        // Set to blank first to reset old cards
        setSearchData(blank);
        const endpoint = 'https://backtick.tilde.wtf';
        const res = await axios(`${endpoint}/search?q=${searchTerm}`);
        const data = await res.data;
        console.log(data);
        setSearchData(data);
      }
    } else {
      history.push('/');
      // No search term. Set Blank
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
