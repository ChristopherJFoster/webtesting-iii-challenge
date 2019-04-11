import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import renderer from 'react-test-renderer';

import Controls from './Controls';

beforeEach(cleanup);

describe('<Controls />', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Controls />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Lock/Unlock Button', () => {
  it('diplays lock gate if gate is unlocked', () => {
    const locked = false;
    const { getByText } = render(<Controls locked={locked} />);
    getByText(/^lock gate$/i);
  });

  it('diplays unlock gate if gate is locked', () => {
    const locked = true;
    const { getByText } = render(<Controls locked={locked} />);
    getByText(/^unlock gate$/i);
  });

  it('is enabled if gate is closed', () => {
    const locked = false;
    const closed = true;
    const mockToggleLocked = jest.fn();
    const { getByText } = render(
      <Controls
        locked={locked}
        closed={closed}
        toggleLocked={mockToggleLocked}
      />
    );
    fireEvent.click(getByText(/^lock gate$/i));
    expect(mockToggleLocked).toHaveBeenCalledTimes(1);
  });

  it('is disabled if gate is opened', () => {
    const locked = false;
    const closed = false;
    const mockToggleLocked = jest.fn();
    const { getByText } = render(
      <Controls
        locked={locked}
        closed={closed}
        toggleLocked={mockToggleLocked}
      />
    );
    fireEvent.click(getByText(/^lock gate$/i));
    expect(mockToggleLocked).toHaveBeenCalledTimes(0);
  });
});
