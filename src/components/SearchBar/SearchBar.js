import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({ fetchResults }) {
  const style = useStyles();
  const [search, setSearch] = useState('');

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchResults(search);
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} className={style.root}>
      <InputBase
        className={style.input}
        value={search}
        onChange={handleSearchChange}
        autoFocus={true}
        placeholder="Search the Tildeverse"
        inputProps={{ 'aria-label': 'search the tildeverse' }}
      />
      <Divider className={style.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={style.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
