import { vi, type Mock } from 'vitest';
import { api } from '../../../api';
import {
  createProject,
  deleteProject,
  editProject,
  getProjectsByDevProfileId,
} from '../projectService';
import type { CreateProjectDTO, EditProjectDTO, Project } from '../interface';

vi.mock('../../../api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedApi = api as jest.Mocked<typeof api>;
describe('project', () => {
  it('should fetch projects by devprofile correctly', async () => {
    const mockApiGet = api.get as Mock;
    mockApiGet.mockResolvedValueOnce({
      data: {
        content: [],
        page: 0,
        size: 5,
        totalElements: 1,
        totalPages: 1,
      },
    });
    const result = await getProjectsByDevProfileId('1', 0, 5);
    expect(mockApiGet).toHaveBeenCalledWith(`/v1/projects/dev-profile/1`, {
      params: { page: 0, size: 5 },
    });
    expect(result.page).toBe(0);
    expect(result.size).toBe(5);
    expect(result.totalElements).toBe(1);
    expect(result.totalPages).toBe(1);
  });

  it('should fetch projects by devprofile correctly', async () => {
    const mockApiGet = api.get as Mock;
    mockApiGet.mockRejectedValueOnce(new Error('Network Error'));
    expect(getProjectsByDevProfileId('1', 0, 5)).rejects.toThrow(
      'Network Error',
    );
    expect(mockApiGet).toHaveBeenCalledWith(`/v1/projects/dev-profile/1`, {
      params: { page: 0, size: 5 },
    });
  });

  describe('createProject', () => {
    it('should call POST with correct payload and return data', async () => {
      const project: CreateProjectDTO = {
        name: 'New Project',
        description: 'Test project',
        devProfileId: '123',
        repoUrl: '',
      };
      const mockResponse: Project = {
        id: '1',
        name: 'New Project',
        description: 'Test project',
        owner: { id: 'owner-1', name: 'Owner Name' },
        repoUrl: '',
      };

      mockedApi.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await createProject(project);

      expect(mockedApi.post).toHaveBeenCalledWith('/v1/projects', project);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when POST fails', async () => {
      const project: CreateProjectDTO = {
        name: 'Error Project',
        description: 'Fail test',
        devProfileId: '456',
        repoUrl: '',
      };
      const error = new Error('Network Error');
      mockedApi.post.mockRejectedValueOnce(error);

      await expect(createProject(project)).rejects.toThrow('Network Error');
      expect(mockedApi.post).toHaveBeenCalledWith('/v1/projects', project);
    });
  });

  describe('editProject', () => {
    it('should call PUT with correct payload and return data', async () => {
      const project: EditProjectDTO = {
        id: '1',
        name: 'Updated Project',
        description: 'Updated description',
        repoUrl: '',
        devProfileId: '123',
      };
      const mockResponse: Project = {
        id: '1',
        name: 'Updated Project',
        description: 'Updated description',
        owner: { id: 'owner-1', name: 'Owner Name' },
        repoUrl: '',
      };

      mockedApi.put.mockResolvedValueOnce({ data: mockResponse });

      const result = await editProject(project);

      expect(mockedApi.put).toHaveBeenCalledWith('/v1/projects', project);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when PUT fails', async () => {
      const project: EditProjectDTO = {
        id: '2',
        name: 'Broken Update',
        description: 'Fail test',
        repoUrl: '',
        devProfileId: '123',
      };
      const error = new Error('Update failed');
      mockedApi.put.mockRejectedValueOnce(error);

      await expect(editProject(project)).rejects.toThrow('Update failed');
      expect(mockedApi.put).toHaveBeenCalledWith('/v1/projects', project);
    });
  });

  describe('deleteProject', () => {
    it('should delete when api return no errors', async () => {
      const id = '1';
      mockedApi.delete.mockResolvedValue(() => Promise.resolve());
      expect(() => deleteProject(id)).not.toThrow();
      expect(mockedApi.delete).toHaveBeenCalledWith('/v1/projects/1');
    });

    it('should not delete when api return errors', async () => {
      const id = '1';
      mockedApi.delete.mockRejectedValue(new Error('Delete failed'));
      expect(deleteProject(id)).rejects.toThrow('Delete failed');
      expect(mockedApi.delete).toHaveBeenCalledWith('/v1/projects/1');
    });
  });
});
