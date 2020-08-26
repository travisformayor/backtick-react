// to dos: 
// add search to url
// scroll switches to mini-header for easy followup searches
// header displays total found
// scroll lazy loads more results

import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import ResultsContainer from '../ResultsContainer/ResultsContainer';
import axios from 'axios';

export default function App() {
  const [searchData, setSearchData] = useState([]);

  async function fetchResults(search) {
    if (search) {
      const res = await axios(`https://backtick.tilde.wtf/search?q=${search}`);
      const data = await res.data;
      setSearchData(data);
    } else {
      const blank = { 'results': null, 'query': null, 'offset': 0, 'total': 0 };
      setSearchData(blank);
    }
  }

  return (
    <>
      <CssBaseline />
      <Header fetchResults={fetchResults} />
      <ResultsContainer searchData={searchData} />
    </>
  );
}
