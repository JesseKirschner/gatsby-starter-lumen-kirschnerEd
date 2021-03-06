// @flow strict
import React, { useRef } from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Logo.module.scss';

type Props = {
  logo: {
    name: string,
    image: string
  },
  isIndex: ?boolean
};

const Logo = ({ logo, isIndex }: Props) => {

  return (
    <div className={styles['logo']}>
      <Link to="/">
        <img
          src={withPrefix(logo.image)}
          className={styles['logo__image']}
          alt={logo.name}
          height="40"
        />
      </Link>
    </div>
  );
};

export default Logo;
