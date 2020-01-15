// @flow strict
import React from 'react';
import Logo from './Logo';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const { logo, author, copyright, menu } = useSiteMetadata();

  console.log(logo)

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Logo logo={logo} isIndex={isIndex} />
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
