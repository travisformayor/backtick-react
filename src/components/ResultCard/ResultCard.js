import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import reactStringReplace from 'react-string-replace';
import newId from '../../utils/newId';

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
  },
  subtitle: {
    fontSize: '.75rem',
  },
});

export default function ResultCard({ result, returnRef }) {
  // ResultCard.js handles displaying individual results
  const style = useStyles();
  const id = newId('card');
  const cardRef = useRef(null);

  function truncObjText(obj, key, limit) {
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

  useEffect(() => {
    if (
      cardRef &&
      cardRef.current &&
      !cardRef.current.classList.contains('animated')
    )
      returnRef(cardRef.current, 'card');
  }, [cardRef, returnRef]);

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
