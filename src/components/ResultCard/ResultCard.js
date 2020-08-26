import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import reactStringReplace from 'react-string-replace';

const useStyles = makeStyles({
  card: {
    margin: '10px',
  },
  content: {
    width: 300,
    height: 225,
  },
  match: {
    fontWeight: 800,
  },
  subtitle: {
    fontSize: '.75rem',
  },
});

export default function ResultsCard({ result }) {
  const { title, url, crawledon, headline } = result;

  const style = useStyles();

  return (
    <Card className={style.card} variant="outlined">
      <CardActionArea className={style.content} href={url} target="_blank">
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="subtitle2" className={style.subtitle}>
            Last Checked {new Date(crawledon).toLocaleDateString()}
            <br />
            {url}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {reactStringReplace(
              headline,
              /<\s*b[^>]*>(.*?)<\s*\/\s*b>/g,
              (match, i) => (
                <span key={i} className={style.match}>
                  {match}
                </span>
              )
            )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
