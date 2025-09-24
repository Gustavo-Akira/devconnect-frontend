import { api } from '../../api';
import type {
  CreateProjectDTO,
  EditProjectDTO,
  ProjectResponse,
} from './interface';

export const getProjectsByDevProfileId = async (
  devProfileId: string,
  page: number,
  size: number,
) => {
  try {
    const { data } = await api.get<ProjectResponse>(
      `/v1/projects/dev-profile/${devProfileId}`,
      {
        params: { page, size },
      },
    );
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const createProject = async (project: CreateProjectDTO) => {
  try {
    const { data } = await api.post('/v1/projects', project);
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const editProject = async (project: EditProjectDTO) => {
  try {
    const { data } = await api.put(`/v1/projects`, project);
    return data;
  } catch (error) {
    console.error('Error editing project:', error);
    throw error;
  }
};
