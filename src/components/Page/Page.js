import React, { useRef, useEffect, useState } from 'react';
import styles from './Page.module.scss';
import { useScrollPosition } from '../../hooks';

type Props = {
  title?: string,
  children: React.Node
};

const maxScaleFontSize = 0.7;
const maxScaleTop = 0.4;

let titleFontSize = null;
let titleTop = null;
let originalHeight = null;

const Page = ({ title, children }: Props) => {
  const pageRef = useRef();
  const pageTitle = useRef();
  const pageTitleContainer = useRef();

  const [titleFontSizeScaled, setTitleFontSizeScaled] = useState();
  const [titleContainerHeight, setTitleContainerHeight] = useState('fit-content');
  const [titleClass, setTitleClass] = useState(styles['page__title']);

  useEffect(() => {
    pageRef.current.scrollIntoView();
  }, [pageRef.current]);

  useScrollPosition(({ currPos }) => {

    if (titleFontSize == null) {
      const { fontSize } = window.getComputedStyle(pageTitle.current);

      // eslint-disable-next-line radix
      titleFontSize = parseInt(fontSize);
      // eslint-disable-next-line radix
      titleTop = parseInt(top);

      originalHeight = pageTitle.current.getBoundingClientRect().height;
      setTitleContainerHeight(originalHeight);
    }

    const scaleFontSize = Math.max(maxScaleFontSize, (100 + (currPos.y / 3)) / 100);

    if (scaleFontSize === maxScaleFontSize) {
      setTitleClass([styles['page__title'], styles['page__max_scaled']].join(' '));
    } else {
      setTitleClass(styles['page__title']);
    }

    setTitleFontSizeScaled(scaleFontSize * titleFontSize);
  }, [titleClass, titleFontSizeScaled, titleContainerHeight]);

  return (
    <div ref={pageRef} className={styles['page']}>
      <div className={styles['page__inner']}>
        {title && <div
          ref={pageTitleContainer}
          className={styles['page__title_container']}
          style={ { height: titleContainerHeight } }>
            <h1
            ref={pageTitle}
            className={titleClass}
            style={ titleFontSizeScaled && { fontSize: titleFontSizeScaled } }>
              {title}
          </h1>
        </div>}
        <div className={styles['page__body']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;