import { renderHook, act, waitFor } from '@testing-library/react';
import { useProjectsPage } from '../useProjectsPage';
import {
  getProjectsByDevProfileId,
  createProject,
  editProject as editProjectCall,
  deleteProject,
} from '../../../../../../shared/infra/services/projects/projectService';
import { useAuth } from '../../../../../../shared/context/auth/authContext';
import { vi, type Mock } from 'vitest';

vi.mock('../../../../../../shared/context/auth/authContext');
vi.mock('../../../../../../shared/infra/services/projects/projectService');
vi.mock(
  '../../../../../../shared/context/notification/notificationContext',
  () => ({
    useNotification: () => ({
      showNotification: vi.fn(),
    }),
  }),
);

describe('useProjectsPage', () => {
  const mockUser = { id: '123' };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as Mock).mockReturnValue({ user: mockUser });
  });

  it('should fetch projects successfully', async () => {
    (getProjectsByDevProfileId as Mock).mockResolvedValue({
      content: [
        {
          id: '1',
          name: 'Test Project',
          description: 'desc',
          repoUrl: 'http://github.com',
        },
      ],
      totalElements: 1,
    });

    const { result } = renderHook(() => useProjectsPage());

    expect(result.current.state.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(result.current.state.projects).toHaveLength(1);
    expect(result.current.state.totalElements).toBe(1);
  });

  it('should handle fetch error', async () => {
    (getProjectsByDevProfileId as Mock).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useProjectsPage());

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(result.current.state.projects).toHaveLength(0);
  });

  it('should update page on handlePageChange', () => {
    const { result } = renderHook(() => useProjectsPage());

    act(() => {
      result.current.actions.handlePageChange(2);
    });

    expect(result.current.state.page).toBe(2);
  });

  it('should update size and reset page on handleSizeChange', () => {
    const { result } = renderHook(() => useProjectsPage());

    act(() => {
      result.current.actions.handleSizeChange(20);
    });

    expect(result.current.state.size).toBe(20);
    expect(result.current.state.page).toBe(0);
  });

  it('should handle modal submit for create', async () => {
    (createProject as Mock).mockResolvedValue({});
    const { result } = renderHook(() => useProjectsPage());

    act(() => {
      result.current.actions.setOpenModal(true);
    });

    await act(async () => {
      await result.current.actions.handleModalSubmit({
        name: 'New Project',
        description: 'desc',
        repoUrl: 'http://github.com',
        devProfileId: '',
      });
    });

    expect(createProject).toHaveBeenCalledWith({
      name: 'New Project',
      description: 'desc',
      repoUrl: 'http://github.com',
      devProfileId: '',
    });
    expect(result.current.state.openModal).toBe(false);
    expect(result.current.state.editProject).toBeNull();
    expect(result.current.state.reloadFlag).toBe(1);
  });

  it('should handle modal submit for edit', async () => {
    (editProjectCall as Mock).mockResolvedValue({});
    const { result } = renderHook(() => useProjectsPage());

    act(() => {
      result.current.actions.setEditProject({
        id: '1',
        name: 'Edit Project',
        description: 'desc',
        repoUrl: 'http://github.com',
        owner: { id: '', name: '' },
      });
      result.current.actions.setOpenModal(true);
    });

    await act(async () => {
      await result.current.actions.handleModalSubmit({
        name: 'Edit Project',
        description: 'desc',
        repoUrl: 'http://github.com',
        devProfileId: '1',
      });
    });

    expect(editProjectCall).toHaveBeenCalledWith({
      id: '1',
      name: 'Edit Project',
      description: 'desc',
      repoUrl: 'http://github.com',
      devProfileId: '1',
    });
    expect(result.current.state.openModal).toBe(false);
    expect(result.current.state.editProject).toBeNull();
    expect(result.current.state.reloadFlag).toBe(1);
  });

  it('should handle edit button', async () => {
    const { result } = renderHook(() => useProjectsPage());
    const project = {
      id: '1',
      name: 'Edit Project',
      description: 'desc',
      repoUrl: 'http://github.com',
      owner: { id: '', name: '' },
    };

    act(() => {
      result.current.actions.handleEditButton(project);
    });

    expect(result.current.state.editProject).toEqual(project);
    expect(result.current.state.openModal).toBe(true);
  });

  it('should handle delete button', async () => {
    (deleteProject as Mock).mockResolvedValue(() => Promise.resolve());
    const { result } = renderHook(() => useProjectsPage());
    await act(async () => {
      await result.current.actions.handleDelete('1');
    });
    expect(result.current.state.reloadFlag).toBe(1);
    expect(result.current.state.loading).toBeFalsy();
  });
});
