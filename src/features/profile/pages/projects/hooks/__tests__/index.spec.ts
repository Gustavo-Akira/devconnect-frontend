import { renderHook, act, waitFor } from '@testing-library/react';
import { useProjectsPage } from '../useProjectsPage';
import { getProjectsByDevProfileId } from '../../../../../../shared/infra/services/projects/projectService';
import { useAuth } from '../../../../../../shared/context/auth/authContext';
import { vi, type Mock } from 'vitest';

vi.mock('../../../../../../shared/context/auth/authContext');
vi.mock('../../../../../../shared/infra/services/projects/projectService');

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
    expect(result.current.state.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    (getProjectsByDevProfileId as Mock).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useProjectsPage());

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(result.current.state.projects).toHaveLength(0);
    expect(result.current.state.error).toBe('Failed to fetch projects');
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
});
