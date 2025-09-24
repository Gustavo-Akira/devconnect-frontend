import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectModal } from '../projectModal';
import type {
  Project,
  CreateProjectDTO,
} from '../../../../../../../shared/infra/services/projects/interface';
import { vi } from 'vitest';

describe('ProjectModal', () => {
  const baseProject: Project = {
    id: '1',
    name: 'Test Project',
    description: 'Some description',
    repoUrl: 'https://github.com/example/repo',
    owner: {
      id: 'dev-123',
      name: 'Dev Name',
    },
  };

  const setup = (
    props?: Partial<React.ComponentProps<typeof ProjectModal>>,
  ) => {
    const defaultProps = {
      open: true,
      devProfileId: 'dev-123',
      onSubmit: vi.fn(),
      onClose: vi.fn(),
      data: null as Project | null,
    };
    return render(<ProjectModal {...defaultProps} {...props} />);
  };

  it('renders Add Project title when no data', () => {
    setup();
    expect(screen.getByText('Add Project')).toBeInTheDocument();
  });

  it('renders Edit Project title when data is provided', () => {
    setup({ data: baseProject });
    expect(screen.getByText('Edit Project')).toBeInTheDocument();
  });

  it('prefills fields when editing', () => {
    setup({ data: baseProject });
    expect(screen.getByLabelText('Project Name')).toHaveValue('Test Project');
    expect(screen.getByLabelText('Repository URL')).toHaveValue(
      'https://github.com/example/repo',
    );
    expect(screen.getByLabelText('Description')).toHaveValue(
      'Some description',
    );
  });

  it('updates state when typing', () => {
    setup();
    const nameInput = screen.getByLabelText('Project Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'New Project' } });
    expect(nameInput.value).toBe('New Project');
  });

  it('calls onSubmit with correct data', () => {
    const onSubmit = vi.fn();
    setup({ onSubmit });

    fireEvent.change(screen.getByLabelText('Project Name'), {
      target: { value: 'New Project' },
    });
    fireEvent.change(screen.getByLabelText('Repository URL'), {
      target: { value: 'https://github.com/new/repo' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Awesome description' },
    });

    fireEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const submitted: CreateProjectDTO = onSubmit.mock.calls[0][0];
    expect(submitted).toEqual({
      name: 'New Project',
      repoUrl: 'https://github.com/new/repo',
      description: 'Awesome description',
      devProfileId: 'dev-123',
    });
  });

  it('calls onClose when Cancel is clicked', () => {
    const onClose = vi.fn();
    setup({ onClose });

    fireEvent.click(screen.getByText('Cancel'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
