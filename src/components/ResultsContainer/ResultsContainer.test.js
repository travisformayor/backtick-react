import React from 'react';
import { render } from '@testing-library/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ResultsContainer from './ResultsContainer';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function setupProps(props = {}) {
  return {
    resultData: {
      'results': [
        {
          title: 'Pobal',
          url: 'http://pebble.ink/~phildini/2018-04-29.html',
          crawledon: '2020-09-07T06:49:52.100583Z',
          headline:
            '<b>Waffle</b> House shooting, has raised ove... RT @Amy_Siskind: This is someone making America great again @realDonaldTrump - in case you need a role model. https://t.co',
        },
        {
          title: '😴',
          url: 'https://tilde.team/~dozens/dreams/15.html',
          crawledon: '2020-09-07T10:35:59.624855Z',
          headline:
            '<b>Waffle</b> House before going to school.)\nThe next morning came and we both slept in and missed our appointment. We planned to meet instead somewhere',
        },
      ],
      query: 'waffles',
      offset: '00',
      total: '11',
    },
    returnRef: () => {},
    fetchMore: () => {},
    loading: false,
  };
}

describe('ResultsContainer', () => {
  it('test rendering the result container', () => {
    const props = setupProps();
    const { queryByText } = render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResultsContainer {...props} />
      </ThemeProvider>
    );

    const selectedText = queryByText('😴');
    expect(selectedText).not.toBeNull();
  });
});
