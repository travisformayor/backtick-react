import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import reactStringReplace from 'react-string-replace';
import newId from '../../utils/newId';

export default function ResultCard({ result, returnRef }) {
  const useStyles = makeStyles({
    card: {
      opacity: 0,
    },
    content: {
      width: 300,
      minHeight: 230,
    },
    match: {
      fontWeight: 800,
      color: '#212121',
    },
    subtitle: {
      fontSize: '.75rem',
    },
  });
  const style = useStyles();

  function truncObjText(obj, key, limit) {
    // to do: for urls, add the end back on.
    // (cont.) ie "site...k/extra". Around 12 chars.

    if (obj && obj[key]) {
      if (obj[key].length <= limit) {
        return obj[key];
      } else {
        return obj[key].slice(0, limit) + '...';
      }
    } else {
      return `Missing result for ${key}`;
    }
  }
  function crawlDate(obj, key) {
    if (obj && obj[key]) {
      return `Checked On ${new Date(obj[key]).toLocaleDateString()}`;
    } else {
      return '';
    }
  }
  const cardTitle = truncObjText(result, 'title', 25);
  const cardUrl = truncObjText(result, 'url', 45);
  const cardDate = crawlDate(result, 'crawledon');
  const cardText = reactStringReplace(
    truncObjText(result, 'headline', 200),
    /<\s*b[^>]*>(.*?)<\s*\/\s*b>/g,
    (match, i) => (
      <span key={i} className={style.match}>
        {match}
      </span>
    )
  );

  const id = newId('card');
  let cardRef = useRef(null);

  useEffect(() => {
    if (cardRef) returnRef(cardRef.current);
  });

  return (
    <Card className={style.card} ref={cardRef} id={id}>
      <CardActionArea
        className={style.content}
        href={result.url}
        target="_blank"
        rel="noopener"
      >
        <CardContent>
          <Typography gutterBottom variant="h6">
            {cardTitle}
          </Typography>
          <Typography variant="subtitle2" className={style.subtitle}>
            {cardUrl}
            <br />
            {cardDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {cardText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
