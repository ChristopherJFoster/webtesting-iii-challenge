import React from 'react';
import { render, cleanup } from 'react-testing-library';
import renderer from 'react-test-renderer';
import 'jest-dom/extend-expect';

import Display from './Display';

beforeEach(cleanup);

describe('<Display />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Display />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('diplays Closed if closed prop is true', () => {
    const closed = true;
    const { getByText } = render(<Display closed={closed} />);
    getByText(/^closed$/i);
  });

  it('diplays Open if closed prop is false', () => {
    const closed = false;
    const { getByText } = render(<Display closed={closed} />);
    getByText(/^open$/i);
  });

  it('diplays Locked if locked prop is true', () => {
    const locked = true;
    const { getByText } = render(<Display locked={locked} />);
    getByText(/^locked$/i);
  });

  it('diplays Unlocked if locked prop is false', () => {
    const locked = false;
    const { getByText } = render(<Display locked={locked} />);
    getByText(/^unlocked$/i);
  });

  it('Open/Closed should have red-led class when closed', () => {
    const closed = true;
    const { getByText } = render(<Display closed={closed} />);
    const openClosedDiv = getByText(/^closed$/i);
    // According to Dodds (the react-testing-library guy), testing for a class is ill-advised since the styling could be applied some other way in the future, which would break the test. However, the assignment instructions specifically ask us to test for classes, so...
    expect(openClosedDiv).toHaveClass('red-led');
  });

  it('Open/Closed should have green-led class when open', () => {
    const closed = false;
    const { getByText } = render(<Display closed={closed} />);
    const openClosedDiv = getByText(/^open$/i);
    expect(openClosedDiv).toHaveClass('green-led');
  });

  it('Unlocked/Locked should have red-led class when locked', () => {
    const locked = true;
    const { getByText } = render(<Display locked={locked} />);
    const unlockedLockedDiv = getByText(/^locked$/i);
    expect(unlockedLockedDiv).toHaveClass('red-led');
  });

  it('Unlocked/Locked should have green-led class when unlocked', () => {
    const locked = false;
    const { getByText } = render(<Display locked={locked} />);
    const unlockedLockedDiv = getByText(/^unlocked$/i);
    expect(unlockedLockedDiv).toHaveClass('green-led');
  });
});
