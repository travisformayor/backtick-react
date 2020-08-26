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
    color: '#212121',
  },
  subtitle: {
    fontSize: '.75rem',
  },
});

function truncText(string, limit) {
  if (string) {
    return string.length < limit ? string : string.slice(0, limit) + '...';
  } else {
    console.log(`missing json result`);
  }
}

function crawlDate(dateString) {
  if (dateString) {
    return `Checked On ${new Date(dateString).toLocaleDateString()}`;
  } else {
    return '';
  }
}

export default function ResultsCard({ result }) {
  const style = useStyles();

  const title = truncText(result.title, 25);
  const url = truncText(result.url, 45);
  const lastCrawl = crawlDate(result.crawledon);
  const headline = reactStringReplace(
    truncText(result.headline, 200),
    /<\s*b[^>]*>(.*?)<\s*\/\s*b>/g,
    (match, i) => (
      <span key={i} className={style.match}>
        {match}
      </span>
    )
  );

  return (
    <Card className={style.card}>
      <CardActionArea
        className={style.content}
        href={url}
        target="_blank"
        rel="noopener"
      >
        <CardContent>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="subtitle2" className={style.subtitle}>
            {url}
            <br />
            {lastCrawl}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {headline}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
