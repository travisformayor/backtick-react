import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dot: {
    margin: '5px',
    height: '8px',
    width: '8px',
    backgroundColor: '#1b1b1b',
    borderRadius: '50%',
    display: 'inline-block',
  },
}));

export default function LoadingDots() {
  // LoadingDots.js contains the loading animation
  const [dotRefs, setDotRefs] = useState(false);
  const dot1 = useRef(null);
  const dot2 = useRef(null);
  const dot3 = useRef(null);
  const dot4 = useRef(null);
  const dot5 = useRef(null);
  const style = useStyles();

  // == Loading Dots
  useEffect(() => {
    // Save all the dot refs to state
    if (
      dot1.current &&
      dot2.current &&
      dot3.current &&
      dot4.current &&
      dot5.current
    ) {
      setDotRefs([
        dot1.current,
        dot2.current,
        dot3.current,
        dot4.current,
        dot5.current,
      ]);
    }
  }, [dot1, dot2, dot3, dot4, dot5]);

  useEffect(() => {
    // Animate the dots
    if (dotRefs.length === 5) {
      const tl = gsap.timeline({ repeat: -1 });
      // console.log('add Dot animation');
      tl.to(dotRefs, { duration: 0.2, y: 10, stagger: 0.05 });
      tl.to(dotRefs, { duration: 0.2, y: 0, stagger: 0.0 });
    }
  }, [dotRefs]);

  return (
    <>
      <div className={style.dot} ref={dot1} />
      <div className={style.dot} ref={dot2} />
      <div className={style.dot} ref={dot3} />
      <div className={style.dot} ref={dot4} />
      <div className={style.dot} ref={dot5} />
    </>
  );
}
