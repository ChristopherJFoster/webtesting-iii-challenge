import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import renderer from 'react-test-renderer';

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Lock/Unlock Button', () => {
  it('does not lock when gate is open', () => {
    const { getByText } = render(<Dashboard />);
    fireEvent.click(getByText(/lock gate/i));
    getByText(/^unlocked$/i);
  });

  it('locks when gate is closed', () => {
    const { getByText } = render(<Dashboard />);
    fireEvent.click(getByText(/close gate/i));
    fireEvent.click(getByText(/lock gate/i));
    getByText(/^locked$/i);
  });
});

describe('Open/Close Button', () => {
  it('does not open when gate is locked', () => {
    const { getByText } = render(<Dashboard />);
    fireEvent.click(getByText(/close gate/i));
    fireEvent.click(getByText(/lock gate/i));
    fireEvent.click(getByText(/open gate/i));
    getByText(/^closed$/i);
  });

  it('opens when gate is unlocked', () => {
    const { getByText } = render(<Dashboard />);
    fireEvent.click(getByText(/open gate/i));
    getByText(/^open$/i);
  });
});
