// to do: add search to url

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
      console.log(searchData);
    } else {
      const blank = { 'results': null, 'query': '', 'offset': 0, 'total': 0 };
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
