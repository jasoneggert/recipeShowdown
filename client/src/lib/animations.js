import posed from 'react-pose';
//Animation components utilize the pose library docs can be found here - https://popmotion.io/pose/learn/popmotion-get-started/
export const GrowShrink = posed.div({
  biggest: {
    scale: 500,
    transition: { duration: 250 },
    opacity: 0,
  },
  big: {
    scale: 50,
    transition: { duration: 250 },
    opacity: 0,
    top: 0,
  },
  sortOfBig: {
    scale: 1.2,
    transition: { duration: 250 },
    opacity: 0,
    top: 0,
  },
  actual: {
    scale: 1,
    transition: { duration: 250 },
    opacity: 1,
    top: 0,
  },
  small: {
    scale: 0.2,
    transition: { duration: 250 },
    opacity: 1,
    top: 0,
  },
  smallest: {
    scale: 0,
    transition: { duration: 250 },
  },
  hide: {
    scale: 1,
    transition: { duration: 250 },
    opacity: 0,
  },
});

export const Fade = posed.div({
  hidden: {
    opacity: 0,
    transition: { duration: 500 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 500 },
  },
});

/*
  TODO: investigate Pose props (https://popmotion.io/pose/learn/dynamic-props/).
  We may be able to remove this const and use <Fade /> with props for handling
  the `applyAtEnd` and  `applyAtStart`.
*/
export const FadeWithRemoveFromDom = posed.div({
  hidden: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
    transition: { duration: 500 },
  },
  visible: {
    applyAtStart: { display: 'block' },
    opacity: 1,
    transition: { duration: 500 },
  },
});

export const GrowFromLeft = posed.div({
  actual: {
    scale: 1,
    height: '100%',
    flip: true,
    transition: {
      duration: 500,
      originX: 'left',
      ease: [0.01, 0.64, 0.33, 0.56],
    },
    top: 0,
  },
  small: {
    scale: 0,
    height: '1px',
    flip: true,
    transition: {
      duration: 500,
      originX: 'left',
      ease: [0.01, 0.64, 0.33, 0.56],
    },
  },
});

export const GrowDown = posed.div({
  open: { height: 'auto', opacity: 1, flip: false },
  closed: { height: '50px', opacity: 1, flip: false },
});

export const GrowWidth = posed.div({
  open: { maxWidth: '600px', width: '600px', flip: false },
  closed: { maxWidth: '300px', width: '300px', flip: false },
});


export const OneHalfScaleUp = () => {
  posed.div({
    actual: {
      scale: 1
    },
    large: {
      scale: 1.5
    }
  });
};
