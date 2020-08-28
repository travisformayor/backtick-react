import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, Divider, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
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

export default function SearchBar({ setSearchTerm, existingTerm }) {
  const [term, setTerm] = useState('');
  const style = useStyles();

  function handleInputChange(e) {
    setTerm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(term);
  }

  useEffect(() => {
    // Save if an existing term was passed in
    if (existingTerm) {
      setTerm(existingTerm);
    }
  }, [existingTerm]);

  return (
    <Paper component="form" onSubmit={handleSubmit} className={style.root}>
      <InputBase
        className={style.input}
        value={term}
        onChange={handleInputChange}
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
