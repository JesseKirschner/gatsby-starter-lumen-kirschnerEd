import React, { useRef, useEffect, useState } from 'react';
import styles from './Page.module.scss';
import { useScrollPosition } from '../../hooks';

type Props = {
  title?: string,
  children: React.Node
};

const Page = ({ title, children }: Props) => {
  const maxScale = 0.7;
  const pageRef = useRef();
  const pageTitle = useRef();

  const [titleScale, setTitleScale] = useState(1);
  const [titleStyle, setTitleStyle] = useState('page_title');
  const [titleFontSize, setTitleFontSize] = useState();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  }, [pageRef.current]);

  useScrollPosition(({ currPos }) => {
    const newScale = (100 + (currPos.y / 3)) / 100;
    setTitleStyle(newScale >= maxScale ? 'page__title' : 'page__titlescaled');
    setTitleScale(newScale >= maxScale ? newScale : 1);

    if (!titleFontSize) {
      const { fontSize } = window.getComputedStyle(pageTitle.current);
      // eslint-disable-next-line radix
      setTitleFontSize(parseInt(fontSize));
    }
  }, [titleScale, titleStyle, titleFontSize]);

  return (
    <div ref={pageRef} className={styles['page']}>
      <div className={styles['page__inner']}>
        {title && <h1
          ref={pageTitle}
          className={styles[titleStyle] }
          style={ { fontSize: titleFontSize * titleScale } }>
            {title}
        </h1>}
        <div className={styles['page__body']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;