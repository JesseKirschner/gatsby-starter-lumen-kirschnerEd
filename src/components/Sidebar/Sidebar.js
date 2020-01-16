// @flow strict
import React, {useState, useCallback } from 'react';
import Logo from './Logo';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './Sidebar.module.scss';
import { useSiteMetadata, useWindowSize } from '../../hooks';

type Props = {
  isIndex?: boolean,
};

const Sidebar = ({ isIndex }: Props) => {
  const {
    logo,
    author,
    copyright,
    menu
  } = useSiteMetadata();


  const [sidebar, setSidebar] = useState(null);

  const onSidebarSet = useCallback((ref) => {
    setSidebar(ref);
  });

  const { height } = useWindowSize();

  const stickyStyle = {
    position: 'sticky',
    top: 0
  };

  if (sidebar && sidebar) {
    const sideBarHeight = sidebar.getBoundingClientRect().height;

    if (sideBarHeight >= height) {
      stickyStyle.top = height - sideBarHeight;
    }
  }

  return (
    <div className={styles['sidebar']} ref={onSidebarSet} style={ stickyStyle }>
      <div className={styles['sidebar__inner']}>
        <Logo logo={logo} isIndex={isIndex}/>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
