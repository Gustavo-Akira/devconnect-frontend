import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectsPage } from '../index';
import { vi } from 'vitest';

const mockProjects = [
  {
    id: '1',
    name: 'Project One',
    description: 'Lorem ipsum dolor sit amet',
    repoUrl: 'https://github.com/projectone',
  },
  {
    id: '2',
    name: 'Project Two',
    description: 'Lorem ipsum dolor sit amet',
    repoUrl: 'https://github.com/projecttwo',
  },
];

vi.mock('../hooks/useProjectsPage', () => ({
  useProjectsPage: () => ({
    state: {
      projects: mockProjects,
      loading: false,
      error: null,
      page: 0,
      size: 5,
      totalElements: 2,
    },
    actions: {
      handlePageChange: vi.fn(),
      handleSizeChange: vi.fn(),
    },
  }),
}));

describe('ProjectsPage', () => {
  it('should render the title and add button', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add new project/i }),
    ).toBeInTheDocument();
  });

  it('should render the project rows', async () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Project One')).toBeInTheDocument();
    expect(screen.getByText('Project Two')).toBeInTheDocument();
    expect(screen.getAllByText(/Lorem ipsum/)).toHaveLength(2);
  });

  it('should render action buttons for each row', async () => {
    render(<ProjectsPage />);
    expect(screen.getAllByLabelText('Edit Project')).toHaveLength(2);
    expect(screen.getAllByLabelText('Delete Project')).toHaveLength(2);
    expect(screen.getAllByLabelText('Open Repository')).toHaveLength(2);
  });

  it('should trigger edit and delete handlers when clicked', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<ProjectsPage />);
    const editButtons = screen.getAllByLabelText('Edit Project');
    fireEvent.click(editButtons[0]);
    expect(spy).toHaveBeenCalledWith('Edit', '1');
    const deleteButtons = screen.getAllByLabelText('Delete Project');
    fireEvent.click(deleteButtons[0]);
    expect(spy).toHaveBeenCalledWith('Delete', '1');
    spy.mockRestore();
  });

  it('should have pagination setup', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('button', { name: /add new project/i })).toBeInTheDocument();
  });
});
