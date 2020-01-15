// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Logo from './Logo';

describe('Logo', () => {
  const props = {
    logo: {
      name: 'test',
      image: '/logo.svg',
    },
    isIndex: false
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Logo {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
