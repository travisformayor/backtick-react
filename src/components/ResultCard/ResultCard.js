import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
});

export default function ResultsCard({ result }) {
  const { title, url, crawledon, headline } = result;

  let snippet = { 'before': result, 'termBlock': '', 'after': '' };

  if (headline.includes('<b>')) {
    const startIndex = headline.indexOf('<b>');
    const endIndex = headline.indexOf('</b>');

    // to do: HERE
    // This only works for single search terms. multi word searches can have multi <b> blocks
    // Write a function that does this for every possible <b></b> block
    if (startIndex !== -1 && endIndex !== -1) {
      snippet = {
        'before': headline.slice(0, startIndex),
        'termBlock': headline.slice(startIndex + 3, endIndex),
        'after': headline.slice(endIndex + 4, headline.length),
      };
    } else {
      console.log('Tagged search term not found');
    }
  } else {
    console.log('Tagged search term not found');
  }

  const style = useStyles();

  return (
    <Card className={style.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* {snippet.before}
            <b>{snippet.termBlock}</b>
            {snippet.after} */}
            {headline}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
