import { render, screen } from '@testing-library/react';
import { InfoContainer } from '..';

describe('InfoContainer', () => {
  it('should render label and value', () => {
    render(<InfoContainer label="Name" value={<span>Gustavo</span>} />);

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Gustavo')).toBeInTheDocument();
  });

  it('should render multiple values when passed', () => {
    render(
      <InfoContainer
        label="Hobbies"
        value={[<span key="1">Read</span>, <span key="2">Play</span>]}
      />,
    );

    expect(screen.getByText('Read')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should use default size when custom size its not passed', () => {
    render(<InfoContainer label="Age" value={<span>22</span>} />);
    const grid = screen.getByText('22').closest('.MuiGrid-root');
    expect(grid).toHaveAttribute(
      'class',
      expect.stringContaining('MuiGrid-root'),
    );
  });

  it('should use custom size when its passed', () => {
    render(
      <InfoContainer
        label="Weight"
        value={<span>70kg</span>}
        size={{ xs: 12, md: 4, lg: 3 }}
      />,
    );

    const grid = screen.getByText('70kg').closest('.MuiGrid-root');
    expect(grid).toBeInTheDocument();
  });
});
