import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import renderer from 'react-test-renderer';

import Controls from './Controls';

afterEach(() => {
  cleanup();
});

describe('<Controls />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
